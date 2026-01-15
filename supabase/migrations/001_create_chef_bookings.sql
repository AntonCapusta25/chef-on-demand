-- Create chef_bookings table (unique name to avoid conflicts)
create table public.chef_bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Chef Information
  chef_id integer not null,
  chef_name text not null,
  chef_price_per_guest numeric not null,
  
  -- Service Details
  service_style text not null, -- 'cook-dine' or 'prepare-store'
  number_of_guests integer not null,
  booking_date date not null,
  booking_time text not null,
  
  -- Meal Details
  meal_preferences text,
  dietary_needs text,
  additional_notes text,
  
  -- Customer Information
  full_name text not null,
  contact_email text not null,
  contact_phone text not null,
  delivery_address text not null,
  arrival_notes text,
  
  -- Pricing
  total_price numeric not null,
  currency text default 'EUR' not null,
  
  -- Status
  booking_status text default 'pending' not null,
  
  constraint chef_bookings_status_check check (booking_status in ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Enable Row Level Security
alter table public.chef_bookings enable row level security;

-- Allow public inserts (for booking submissions)
create policy "Allow public to submit bookings"
  on public.chef_bookings
  for insert
  to anon
  with check (true);

-- Allow authenticated users to read their own bookings
create policy "Users can view own bookings"
  on public.chef_bookings
  for select
  to authenticated
  using (contact_email = auth.jwt() ->> 'email');

-- Create index for faster queries
create index chef_bookings_email_idx on public.chef_bookings(contact_email);
create index chef_bookings_date_idx on public.chef_bookings(booking_date);
create index chef_bookings_status_idx on public.chef_bookings(booking_status);
