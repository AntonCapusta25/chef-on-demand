
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
    return data;
}
