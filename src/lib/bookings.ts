import { supabase } from './supabase';
import { Chef, BookingFormData } from '@/types';

export interface ChefBookingData {
    chef_id: number;
    chef_name: string;
    chef_price_per_guest: number;
    service_style: string;
    number_of_guests: number;
    booking_date: string;
    booking_time: string;
    meal_preferences: string;
    dietary_needs: string;
    additional_notes: string;
    full_name: string;
    contact_email: string;
    contact_phone: string;
    delivery_address: string;
    arrival_notes: string;
    total_price: number;
    currency: string;
}

export async function submitChefBooking(
    chef: Chef,
    formData: BookingFormData
): Promise<{ success: boolean; bookingId?: string; error?: string }> {
    try {
        if (!formData.date) {
            throw new Error('Please select a booking date');
        }

        const bookingData: ChefBookingData = {
            // Chef info
            chef_id: chef.id,
            chef_name: chef.name,
            chef_price_per_guest: chef.pricePerGuest,

            // Service details
            service_style: formData.serviceType,
            number_of_guests: formData.guestCount,
            booking_date: formData.date.toISOString().split('T')[0],
            booking_time: formData.time,

            // Meal details
            meal_preferences: formData.mealDescription || '',
            dietary_needs: formData.dietaryRequirements || '',
            additional_notes: formData.notes || '',

            // Customer info
            full_name: formData.fullName,
            contact_email: formData.email,
            contact_phone: formData.phone,
            delivery_address: formData.address,
            arrival_notes: formData.arrivalInstructions || '',

            // Pricing
            total_price: chef.pricePerGuest * formData.guestCount,
            currency: 'EUR',
        };

        const { data, error } = await supabase
            .from('chef_bookings')
            .insert([bookingData])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(error.message);
        }

        // Send emails via Edge Function
        try {
            const emailPayload = {
                booking_id: data.id,
                chef_name: chef.name,
                customer_name: formData.fullName,
                customer_email: formData.email,
                service_style: formData.serviceType,
                number_of_guests: formData.guestCount,
                booking_date: formData.date.toISOString().split('T')[0],
                booking_time: formData.time,
                total_price: chef.pricePerGuest * formData.guestCount,
                meal_preferences: formData.mealDescription,
                dietary_needs: formData.dietaryRequirements,
                delivery_address: formData.address,
                contact_phone: formData.phone,
            };

            console.log('Sending email with payload:', emailPayload);

            const emailResponse = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-emails`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                    },
                    body: JSON.stringify(emailPayload),
                }
            );

            console.log('Email response status:', emailResponse.status);
            const responseText = await emailResponse.text();
            console.log('Email response:', responseText);

            if (!emailResponse.ok) {
                console.error('Email sending failed:', responseText);
                // Don't fail the booking if emails fail
            } else {
                console.log('Emails sent successfully!');
            }
        } catch (emailError) {
            console.error('Email error:', emailError);
            // Don't fail the booking if emails fail
        }

        return {
            success: true,
            bookingId: data.id,
        };
    } catch (error) {
        console.error('Booking submission error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to submit booking',
        };
    }
}
