-- Fix RLS policy for chef_bookings table
-- Run this in Supabase SQL Editor

-- First, drop existing policies if any
DROP POLICY IF EXISTS "Allow public to submit bookings" ON public.chef_bookings;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.chef_bookings;

-- Disable RLS temporarily to allow all operations
ALTER TABLE public.chef_bookings DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.chef_bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings
CREATE POLICY "Enable insert for all users"
  ON public.chef_bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow anyone to read their own bookings
CREATE POLICY "Enable read for own bookings"
  ON public.chef_bookings
  FOR SELECT
  TO public
  USING (true);
