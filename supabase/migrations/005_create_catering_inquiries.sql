
create table if not exists catering_inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  menu_preference text not null,
  chef_preference text not null,
  cuisine_style text not null,
  event_date date not null,
  guest_count integer not null,
  name text not null,
  email text not null,
  status text default 'pending' not null
);

-- Enable RLS
alter table catering_inquiries enable row level security;

-- Allow public to insert inquiries
create policy "Allow public to insert inquiries"
  on catering_inquiries for insert
  with check (true);

-- Allow admins (or service role) to view all inquiries
-- For now, we'll allow authenticated users to view their own, or just keep it restricted
-- Assuming there's an admin role or similar, but for now let's just allow read for anon for demo purposes or restrict to service role?
-- The requirements said "restrict viewing to admins". 
-- Since we don't have a full admin system set up visible here, we'll just leave reading restricted to service_role by default (no select policy for public).
