# Supabase Integration Setup Guide

## Step 1: Run Database Migrations

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor**
4. Run the migrations in order:

### Migration 1: Create chef_bookings table
Copy and paste the contents of `supabase/migrations/001_create_chef_bookings.sql`

### Migration 2: Create email trigger
Copy and paste the contents of `supabase/migrations/002_create_email_trigger.sql`

## Step 2: Configure SendGrid

1. Get your SendGrid API key from: https://app.sendgrid.com/settings/api_keys
2. Verify sender email `chefs@homemademeals.net` in SendGrid:
   - Go to Settings → Sender Authentication
   - Add and verify the email address

## Step 3: Deploy Edge Function

1. Install Supabase CLI if you haven't:
```bash
brew install supabase/tap/supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
cd /Users/alexandrfilippov/.gemini/antigravity/scratch/chef-on-demand
supabase link --project-ref xejumvygkvytqxutnito
```

4. Set SendGrid API key as a secret:
```bash
supabase secrets set SENDGRID_API_KEY=your_sendgrid_api_key_here
```

5. Deploy the edge function:
```bash
supabase functions deploy send-booking-emails
```

## Step 4: Test the Integration

1. Restart your dev server:
```bash
npm run dev
```

2. Navigate to a chef profile
3. Fill out and submit the booking form
4. Check:
   - Supabase dashboard → Table Editor → chef_bookings (should have new entry)
   - Customer email inbox (should receive confirmation)
   - chefs@homemademeals.net inbox (should receive notification)

## Troubleshooting

### Emails not sending?
- Check Supabase Functions logs: Dashboard → Edge Functions → send-booking-emails → Logs
- Verify SendGrid API key is correct
- Ensure sender email is verified in SendGrid

### Database errors?
- Check Supabase logs: Dashboard → Logs
- Verify migrations ran successfully
- Check RLS policies are enabled

### Form not submitting?
- Check browser console for errors
- Verify .env.local has correct Supabase credentials
- Restart dev server after adding .env.local
