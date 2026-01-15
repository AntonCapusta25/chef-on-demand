export interface Chef {
    id: number;
    name: string;
    photo: string;
    rating: number;
    reviewCount: number;
    nextAvailable: string;
    serviceCategory: string;
    cuisines: string[];
    languages: string[];
    bio: string;
    gender: 'male' | 'female';
    pricePerGuest: number;
}

export interface Review {
    id: number;
    chefId: number;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
}

export interface ServiceType {
    id: string;
    name: string;
    description: string;
}

export interface BookingFormData {
    serviceType: string;
    guestCount: number;
    date: Date | null;
    time: string;
    mealDescription: string;
    dietaryRequirements: string;
    notes: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    arrivalInstructions: string;
}

export interface Location {
    id: string;
    name: string;
    slug: string;
}

export interface FAQ {
    id: number;
    category: string;
    question: string;
    answer: string;
}
