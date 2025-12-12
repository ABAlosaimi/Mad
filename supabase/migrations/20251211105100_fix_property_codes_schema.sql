/*
  # Fix Property Codes Schema and Add Public Access

  1. Changes
    - Make property_id nullable
    - Add complex_id column for real estate complexes
    - Add constraint to ensure either property_id or complex_id is set
    - Add policies for public access to property/complex data when code is active

  2. Security
    - Update RLS policies to allow public access to property/complex details when code is active
    - Maintain secure access control for authenticated users
*/

-- Make property_id nullable and add complex_id
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'property_codes'
    AND column_name = 'property_id'
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE property_codes ALTER COLUMN property_id DROP NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'property_codes'
    AND column_name = 'complex_id'
  ) THEN
    ALTER TABLE property_codes ADD COLUMN complex_id uuid REFERENCES real_estate_complexes(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add constraint to ensure either property_id or complex_id is set (but not both)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'property_codes_single_reference_check'
  ) THEN
    ALTER TABLE property_codes
    ADD CONSTRAINT property_codes_single_reference_check
    CHECK (
      (property_id IS NOT NULL AND complex_id IS NULL) OR
      (property_id IS NULL AND complex_id IS NOT NULL)
    );
  END IF;
END $$;

-- Add policy for public to view single_properties data when code is active
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'single_properties'
    AND policyname = 'Public can view properties with active codes'
  ) THEN
    CREATE POLICY "Public can view properties with active codes"
      ON single_properties FOR SELECT
      TO anon
      USING (
        EXISTS (
          SELECT 1 FROM property_codes
          WHERE property_codes.property_id = single_properties.id
          AND property_codes.is_active = true
        )
      );
  END IF;
END $$;

-- Add policy for authenticated users to view single_properties with active codes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'single_properties'
    AND policyname = 'Authenticated can view properties with active codes'
  ) THEN
    CREATE POLICY "Authenticated can view properties with active codes"
      ON single_properties FOR SELECT
      TO authenticated
      USING (
        auth.uid() = user_id OR
        EXISTS (
          SELECT 1 FROM property_codes
          WHERE property_codes.property_id = single_properties.id
          AND property_codes.is_active = true
        )
      );
  END IF;
END $$;

-- Add policy for public to view real_estate_complexes data when code is active
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'real_estate_complexes'
    AND policyname = 'Public can view complexes with active codes'
  ) THEN
    CREATE POLICY "Public can view complexes with active codes"
      ON real_estate_complexes FOR SELECT
      TO anon
      USING (
        EXISTS (
          SELECT 1 FROM property_codes
          WHERE property_codes.complex_id = real_estate_complexes.id
          AND property_codes.is_active = true
        )
      );
  END IF;
END $$;

-- Add policy for authenticated users to view real_estate_complexes with active codes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'real_estate_complexes'
    AND policyname = 'Authenticated can view complexes with active codes'
  ) THEN
    CREATE POLICY "Authenticated can view complexes with active codes"
      ON real_estate_complexes FOR SELECT
      TO authenticated
      USING (
        auth.uid() = user_id OR
        EXISTS (
          SELECT 1 FROM property_codes
          WHERE property_codes.complex_id = real_estate_complexes.id
          AND property_codes.is_active = true
        )
      );
  END IF;
END $$;

-- Add policy for public to update view count on active codes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'property_codes'
    AND policyname = 'Public can update view count on active codes'
  ) THEN
    CREATE POLICY "Public can update view count on active codes"
      ON property_codes FOR UPDATE
      TO anon
      USING (is_active = true)
      WITH CHECK (is_active = true);
  END IF;
END $$;

-- Add policy for authenticated users to update view count on active codes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'property_codes'
    AND policyname = 'Authenticated can update view count on active codes'
  ) THEN
    CREATE POLICY "Authenticated can update view count on active codes"
      ON property_codes FOR UPDATE
      TO authenticated
      USING (
        is_active = true OR
        EXISTS (
          SELECT 1 FROM single_properties
          WHERE single_properties.id = property_codes.property_id
          AND single_properties.user_id = auth.uid()
        ) OR
        EXISTS (
          SELECT 1 FROM real_estate_complexes
          WHERE real_estate_complexes.id = property_codes.complex_id
          AND real_estate_complexes.user_id = auth.uid()
        )
      )
      WITH CHECK (
        is_active = true OR
        EXISTS (
          SELECT 1 FROM single_properties
          WHERE single_properties.id = property_codes.property_id
          AND single_properties.user_id = auth.uid()
        ) OR
        EXISTS (
          SELECT 1 FROM real_estate_complexes
          WHERE real_estate_complexes.id = property_codes.complex_id
          AND real_estate_complexes.user_id = auth.uid()
        )
      );
  END IF;
END $$;