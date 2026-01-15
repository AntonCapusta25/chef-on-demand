import { FAQ } from '../types';

export const faqs: FAQ[] = [
    {
        id: 1,
        category: "Booking",
        question: "How far in advance should I book a chef?",
        answer: "We recommend booking at least 2-3 days in advance to ensure chef availability. However, same-day bookings may be available depending on chef schedules.",
    },
    {
        id: 2,
        category: "Booking",
        question: "Can I cancel or reschedule my booking?",
        answer: "Yes, you can cancel or reschedule up to 24 hours before your booking time. Cancellations within 24 hours may incur a fee.",
    },
    {
        id: 3,
        category: "Service",
        question: "What's included in the chef service?",
        answer: "Our chefs handle meal preparation, cooking, plating, and kitchen cleanup. You provide the ingredients or we can arrange grocery shopping for an additional fee.",
    },
    {
        id: 4,
        category: "Service",
        question: "Do I need to provide ingredients?",
        answer: "You can either provide ingredients yourself or request our chef to handle grocery shopping. Shopping services are available for an additional fee.",
    },
    {
        id: 5,
        category: "Payment",
        question: "When do I pay for the service?",
        answer: "Payment is processed when you confirm your booking. We accept all major credit cards and digital payment methods.",
    },
    {
        id: 6,
        category: "Payment",
        question: "Are there any additional fees?",
        answer: "The base price covers the chef's service. Additional fees may apply for grocery shopping, special equipment, or travel outside Greater Cairo.",
    },
    {
        id: 7,
        category: "Safety",
        question: "Are all chefs verified and background-checked?",
        answer: "Yes, all our chefs undergo thorough background checks, health screenings, and certification verification before joining our platform.",
    },
    {
        id: 8,
        category: "Safety",
        question: "What COVID-19 safety measures are in place?",
        answer: "All chefs follow strict hygiene protocols, wear masks, use hand sanitizer, and maintain social distancing guidelines.",
    },
];

export const faqCategories = Array.from(new Set(faqs.map(faq => faq.category)));
