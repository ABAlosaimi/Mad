/*
  # Create Properties and Real Estate Complexes Tables

  1. New Tables
    - `single_properties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text) - Property name
      - `address` (text) - Property address
      - `type` (text) - Property type (e.g., Single Family Home, Apartment)
      - `electricity_usage` (numeric) - kWh usage
      - `electricity_cost` (numeric) - Cost in dollars
      - `water_usage` (numeric) - Gallons usage
      - `water_cost` (numeric) - Cost in dollars
      - `internet_usage` (numeric) - GB usage
      - `internet_cost` (numeric) - Cost in dollars
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `real_estate_complexes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text) - Complex name
      - `address` (text) - Complex address
      - `total_units` (integer) - Total number of units
      - `occupied_units` (integer) - Number of occupied units
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `complex_units`
      - `id` (uuid, primary key)
      - `complex_id` (uuid, references real_estate_complexes)
      - `name` (text) - Unit name/number
      - `occupancy` (text) - Occupied or Vacant
      - `total_cost` (numeric) - Total utility cost
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own properties
*/

-- Create single_properties table
CREATE TABLE IF NOT EXISTS single_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  type text DEFAULT 'Single Family Home',
  electricity_usage numeric DEFAULT 0,
  electricity_cost numeric DEFAULT 0,
  water_usage numeric DEFAULT 0,
  water_cost numeric DEFAULT 0,
  internet_usage numeric DEFAULT 0,
  internet_cost numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create real_estate_complexes table
CREATE TABLE IF NOT EXISTS real_estate_complexes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  total_units integer DEFAULT 0,
  occupied_units integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create complex_units table
CREATE TABLE IF NOT EXISTS complex_units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complex_id uuid REFERENCES real_estate_complexes(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  occupancy text DEFAULT 'Vacant',
  total_cost numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE single_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_complexes ENABLE ROW LEVEL SECURITY;
ALTER TABLE complex_units ENABLE ROW LEVEL SECURITY;

-- Policies for single_properties
CREATE POLICY "Users can view own properties"
  ON single_properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own properties"
  ON single_properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties"
  ON single_properties FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties"
  ON single_properties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for real_estate_complexes
CREATE POLICY "Users can view own complexes"
  ON real_estate_complexes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own complexes"
  ON real_estate_complexes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own complexes"
  ON real_estate_complexes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own complexes"
  ON real_estate_complexes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for complex_units
CREATE POLICY "Users can view units of their complexes"
  ON complex_units FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM real_estate_complexes
      WHERE real_estate_complexes.id = complex_units.complex_id
      AND real_estate_complexes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert units to their complexes"
  ON complex_units FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM real_estate_complexes
      WHERE real_estate_complexes.id = complex_units.complex_id
      AND real_estate_complexes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update units of their complexes"
  ON complex_units FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM real_estate_complexes
      WHERE real_estate_complexes.id = complex_units.complex_id
      AND real_estate_complexes.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM real_estate_complexes
      WHERE real_estate_complexes.id = complex_units.complex_id
      AND real_estate_complexes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete units of their complexes"
  ON complex_units FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM real_estate_complexes
      WHERE real_estate_complexes.id = complex_units.complex_id
      AND real_estate_complexes.user_id = auth.uid()
    )
  );