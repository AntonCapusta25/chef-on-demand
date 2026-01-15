-- Create function to trigger email sending
create or replace function public.send_chef_booking_emails()
returns trigger as $$
begin
  -- Call the edge function to send emails
  perform
    net.http_post(
      url := current_setting('app.settings.edge_function_url') || '/send-booking-emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object(
        'booking_id', new.id,
        'chef_name', new.chef_name,
        'customer_name', new.full_name,
        'customer_email', new.contact_email,
        'service_style', new.service_style,
        'number_of_guests', new.number_of_guests,
        'booking_date', new.booking_date,
        'booking_time', new.booking_time,
        'total_price', new.total_price,
        'meal_preferences', new.meal_preferences,
        'dietary_needs', new.dietary_needs,
        'delivery_address', new.delivery_address,
        'contact_phone', new.contact_phone
      )
    );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to send emails on new bookings
create trigger on_chef_booking_created
  after insert on public.chef_bookings
  for each row
  execute function public.send_chef_booking_emails();
