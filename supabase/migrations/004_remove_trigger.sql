-- Remove the email trigger temporarily
-- This allows bookings to work without the net.http_post dependency
-- Run this in Supabase SQL Editor

DROP TRIGGER IF EXISTS on_chef_booking_created ON public.chef_bookings;
DROP FUNCTION IF EXISTS public.send_chef_booking_emails();
