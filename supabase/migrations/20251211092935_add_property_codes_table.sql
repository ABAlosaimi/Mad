/*
  # Add Property Codes Table

  1. New Table
    - `property_codes`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references single_properties)
      - `code` (text, unique) - Unique property code for sharing
      - `service_score` (integer) - Overall service score (0-100)
      - `reliability_rating` (text) - Rating: Excellent, Good, Fair, Poor
      - `public_views` (integer) - Number of times the code was viewed
      - `is_active` (boolean) - Whether the code is active for sharing
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on property_codes table
    - Add policies for authenticated users to manage codes for their properties
    - Add policy for public to view active codes (for sharing feature)
*/

-- Create property_codes table
CREATE TABLE IF NOT EXISTS property_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES single_properties(id) ON DELETE CASCADE NOT NULL,
  code text UNIQUE NOT NULL,
  service_score integer DEFAULT 0,
  reliability_rating text DEFAULT 'Good',
  public_views integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE property_codes ENABLE ROW LEVEL SECURITY;

-- Policy for users to view codes for their own properties
CREATE POLICY "Users can view codes for their properties"
  ON property_codes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM single_properties
      WHERE single_properties.id = property_codes.property_id
      AND single_properties.user_id = auth.uid()
    )
  );

-- Policy for users to insert codes for their properties
CREATE POLICY "Users can create codes for their properties"
  ON property_codes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM single_properties
      WHERE single_properties.id = property_codes.property_id
      AND single_properties.user_id = auth.uid()
    )
  );

-- Policy for users to update codes for their properties
CREATE POLICY "Users can update codes for their properties"
  ON property_codes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM single_properties
      WHERE single_properties.id = property_codes.property_id
      AND single_properties.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM single_properties
      WHERE single_properties.id = property_codes.property_id
      AND single_properties.user_id = auth.uid()
    )
  );

-- Policy for users to delete codes for their properties
CREATE POLICY "Users can delete codes for their properties"
  ON property_codes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM single_properties
      WHERE single_properties.id = property_codes.property_id
      AND single_properties.user_id = auth.uid()
    )
  );

-- Policy for public to view active codes (for sharing feature)
CREATE POLICY "Public can view active codes"
  ON property_codes FOR SELECT
  TO anon
  USING (is_active = true);