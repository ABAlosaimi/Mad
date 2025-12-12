/*
  # Add Support for Demo/Public Sample Data

  1. Changes
    - Make user_id nullable in single_properties and real_estate_complexes tables
    - Update RLS policies to handle NULL user_id (demo data)
    - Add sample demo properties and codes for testing

  2. Security
    - Demo properties (user_id IS NULL) are publicly viewable
    - Regular properties maintain existing RLS policies
*/

-- Make user_id nullable in single_properties
ALTER TABLE single_properties ALTER COLUMN user_id DROP NOT NULL;

-- Make user_id nullable in real_estate_complexes
ALTER TABLE real_estate_complexes ALTER COLUMN user_id DROP NOT NULL;

-- Update policy for single_properties to allow public demo properties
DROP POLICY IF EXISTS "Users can view own properties" ON single_properties;
CREATE POLICY "Users can view own properties"
  ON single_properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Add policy for public to view demo properties
DROP POLICY IF EXISTS "Public can view properties with active codes" ON single_properties;
CREATE POLICY "Public can view demo and code properties"
  ON single_properties FOR SELECT
  TO anon
  USING (
    user_id IS NULL OR
    EXISTS (
      SELECT 1 FROM property_codes
      WHERE property_codes.property_id = single_properties.id
      AND property_codes.is_active = true
    )
  );

-- Update authenticated users policy
DROP POLICY IF EXISTS "Authenticated can view properties with active codes" ON single_properties;
CREATE POLICY "Authenticated can view all accessible properties"
  ON single_properties FOR SELECT
  TO authenticated
  USING (
    user_id IS NULL OR
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM property_codes
      WHERE property_codes.property_id = single_properties.id
      AND property_codes.is_active = true
    )
  );

-- Update policy for real_estate_complexes to allow public demo complexes
DROP POLICY IF EXISTS "Users can view own complexes" ON real_estate_complexes;
CREATE POLICY "Users can view own complexes"
  ON real_estate_complexes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Add policy for public to view demo complexes
DROP POLICY IF EXISTS "Public can view complexes with active codes" ON real_estate_complexes;
CREATE POLICY "Public can view demo and code complexes"
  ON real_estate_complexes FOR SELECT
  TO anon
  USING (
    user_id IS NULL OR
    EXISTS (
      SELECT 1 FROM property_codes
      WHERE property_codes.complex_id = real_estate_complexes.id
      AND property_codes.is_active = true
    )
  );

-- Update authenticated users policy for complexes
DROP POLICY IF EXISTS "Authenticated can view complexes with active codes" ON real_estate_complexes;
CREATE POLICY "Authenticated can view all accessible complexes"
  ON real_estate_complexes FOR SELECT
  TO authenticated
  USING (
    user_id IS NULL OR
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM property_codes
      WHERE property_codes.complex_id = real_estate_complexes.id
      AND property_codes.is_active = true
    )
  );

-- Insert demo single properties
INSERT INTO single_properties (
  id, user_id, name, address, type, 
  electricity_usage, electricity_cost,
  water_usage, water_cost,
  internet_usage, internet_cost
) VALUES 
(
  '10000000-0000-0000-0000-000000000001', NULL,
  'Sunny Apartment 4B', '123 Maple Street, Downtown', 'Apartment',
  450, 45, 3500, 22, 250, 65
),
(
  '10000000-0000-0000-0000-000000000002', NULL,
  'Oak Villa', '456 Oak Avenue, Riverside', 'Single Family Home',
  850, 95, 5200, 45, 400, 80
),
(
  '10000000-0000-0000-0000-000000000003', NULL,
  'Sunset Condo', '789 Beach Boulevard, Seaside', 'Condominium',
  320, 35, 2800, 18, 180, 55
)
ON CONFLICT (id) DO NOTHING;

-- Insert demo real estate complex
INSERT INTO real_estate_complexes (
  id, user_id, name, address, total_units, occupied_units
) VALUES (
  '20000000-0000-0000-0000-000000000001', NULL,
  'Greenwood Apartments', '789 Pine Street, Westside', 24, 20
)
ON CONFLICT (id) DO NOTHING;

-- Insert property codes for demo properties
INSERT INTO property_codes (
  property_id, code, service_score, reliability_rating, public_views, is_active
) VALUES 
(
  '10000000-0000-0000-0000-000000000001', 'SC-MAP-123-4B', 94, 'Excellent', 0, true
),
(
  '10000000-0000-0000-0000-000000000002', 'SC-OAK-456-12A', 88, 'Good', 0, true
),
(
  '10000000-0000-0000-0000-000000000003', 'SC-BCH-789-7C', 91, 'Excellent', 0, true
)
ON CONFLICT (code) DO NOTHING;

-- Insert property code for demo complex
INSERT INTO property_codes (
  complex_id, code, service_score, reliability_rating, public_views, is_active
) VALUES (
  '20000000-0000-0000-0000-000000000001', 'RC-PIN-789', 92, 'Excellent', 0, true
)
ON CONFLICT (code) DO NOTHING;