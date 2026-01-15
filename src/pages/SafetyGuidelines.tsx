import { Shield, Users, Utensils, Home } from 'lucide-react';

const sections = [
    {
        id: 'chef-standards',
        title: 'Chef Standards',
        icon: Utensils,
        content: [
            'All chefs undergo thorough background checks and verification',
            'Health certifications and food safety training required',
            'Regular performance reviews and customer feedback monitoring',
            'Professional culinary experience and qualifications verified',
        ],
    },
    {
        id: 'hygiene-protocols',
        title: 'Hygiene & Safety Protocols',
        icon: Shield,
        content: [
            'Chefs wear masks and use hand sanitizer throughout service',
            'All cooking equipment and surfaces are sanitized before and after use',
            'Temperature checks conducted before each service',
            'Fresh ingredients handled with proper food safety procedures',
            'Allergen awareness and cross-contamination prevention',
        ],
    },
    {
        id: 'customer-safety',
        title: 'Customer Safety',
        icon: Home,
        content: [
            'Contactless payment options available',
            'Minimal contact service protocols in place',
            'Chefs arrive with their own equipment and supplies',
            'Kitchen cleanup and sanitization included in service',
            'Emergency contact information always available',
        ],
    },
    {
        id: 'community-guidelines',
        title: 'Community Guidelines',
        icon: Users,
        content: [
            'Respectful and professional conduct expected from all parties',
            'Clear communication about dietary requirements and preferences',
            'Punctuality and reliability from both chefs and customers',
            'Honest reviews and feedback to maintain service quality',
            'Zero tolerance for discrimination or harassment',
        ],
    },
];

export function SafetyGuidelines() {
    return (
        <div className="min-h-screen bg-muted/30 py-12">
            <div className="container px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-4xl font-bold">Safety Guidelines</h1>
                        <p className="text-lg text-muted-foreground">
                            Your safety and satisfaction are our top priorities
                        </p>
                    </div>

                    <div className="space-y-8">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <div
                                    key={section.id}
                                    id={section.id}
                                    className="rounded-xl bg-background p-8 shadow-sm"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold">{section.title}</h2>
                                    </div>
                                    <ul className="space-y-3">
                                        {section.content.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                                <span className="text-muted-foreground">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
