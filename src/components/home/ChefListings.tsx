import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { ChefCard } from './ChefCard';
import { mockChefs } from '@/data/mockChefs';

export function ChefListings() {
    const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');

    const filteredChefs = mockChefs.filter((chef) => {
        if (genderFilter === 'all') return true;
        return chef.gender === genderFilter;
    });

    return (
        <section id="chefs-section" className="py-16">
            <div className="container px-4">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-3xl font-bold">Available Chefs</h2>

                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-muted-foreground" />
                        <div className="flex gap-2">
                            <Button
                                variant={genderFilter === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setGenderFilter('all')}
                            >
                                All
                            </Button>
                            <Button
                                variant={genderFilter === 'male' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setGenderFilter('male')}
                            >
                                Male
                            </Button>
                            <Button
                                variant={genderFilter === 'female' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setGenderFilter('female')}
                            >
                                Female
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredChefs.map((chef) => (
                        <ChefCard key={chef.id} chef={chef} />
                    ))}
                </div>
            </div>
        </section>
    );
}
