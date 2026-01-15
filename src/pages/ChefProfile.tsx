import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Globe, Award } from 'lucide-react';
import { mockChefs } from '@/data/mockChefs';
import { mockReviews } from '@/data/mockReviews';
import { BookingForm } from '@/components/chef/BookingForm';
import { ReviewsTab } from '@/components/chef/ReviewsTab';

export function ChefProfile() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'booking' | 'reviews'>('booking');

    const chef = mockChefs.find((c) => c.id === Number(id));

    if (!chef) {
        return (
            <div className="container px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">Chef not found</h1>
            </div>
        );
    }

    const chefReviews = mockReviews.filter((r) => r.chefId === chef.id);

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container px-4">
                {/* Chef Header */}
                <div className="mb-8 overflow-hidden rounded-xl bg-background shadow-lg">
                    <div className="grid gap-6 p-6 md:grid-cols-[200px_1fr]">
                        <div className="mx-auto md:mx-0">
                            <img
                                src={chef.photo}
                                alt={chef.name}
                                className="h-48 w-48 rounded-full object-cover"
                            />
                        </div>

                        <div>
                            <h1 className="mb-2 text-3xl font-bold">{chef.name}</h1>
                            <div className="mb-4 flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-primary text-primary" />
                                    <span className="text-lg font-semibold">{chef.rating}</span>
                                    <span className="text-muted-foreground">
                                        ({chef.reviewCount} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Award className="h-5 w-5" />
                                    <span>{chef.serviceCategory}</span>
                                </div>
                            </div>

                            <p className="mb-4 text-muted-foreground">{chef.bio}</p>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm">{chef.languages.join(', ')}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {chef.cuisines.map((cuisine) => (
                                        <span
                                            key={cuisine}
                                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                        >
                                            {cuisine}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex gap-4 border-b">
                    <button
                        className={`border-b-2 px-4 py-3 font-semibold transition-colors ${activeTab === 'booking'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        onClick={() => setActiveTab('booking')}
                    >
                        Book a Service
                    </button>
                    <button
                        className={`border-b-2 px-4 py-3 font-semibold transition-colors ${activeTab === 'reviews'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews & Ratings
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'booking' ? (
                    <BookingForm chef={chef} />
                ) : (
                    <ReviewsTab reviews={chefReviews} />
                )}
            </div>
        </div>
    );
}
