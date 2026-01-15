
import { supabase } from './supabase';

export interface CateringInquiry {
    menu_preference: string;
    chef_preference: string;
    cuisine_style: string;
    event_date: string;
    guest_count: number;
    name: string;
    email: string;
}

export async function submitCateringInquiry(inquiry: CateringInquiry) {
    const { data, error } = await supabase
        .from('catering_inquiries')
        .insert([
            {
                ...inquiry,
                status: 'pending'
            }
        ])
        .select()
        .single();

    if (error) throw error;

    // Send email notifications
    try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token || '';

        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-catering-emails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(data),
        });
        // Don't throw if email fails - inquiry is already saved
    } catch (emailError) {
        console.error('Failed to send email notifications:', emailError);
    }

    return data;
}
