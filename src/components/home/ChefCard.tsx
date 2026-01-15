import { Link } from 'react-router-dom';
import { Star, Calendar, Globe } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Chef } from '@/types';
import { format } from 'date-fns';

interface ChefCardProps {
    chef: Chef;
}

export function ChefCard({ chef }: ChefCardProps) {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <div className="aspect-square overflow-hidden">
                <img
                    src={chef.photo}
                    alt={chef.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                />
            </div>
            <CardContent className="p-6">
                <div className="mb-3">
                    <h3 className="mb-1 text-xl font-bold">{chef.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-semibold">{chef.rating}</span>
                        </div>
                        <span className="text-muted-foreground">
                            ({chef.reviewCount} reviews)
                        </span>
                    </div>
                </div>

                <div className="mb-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                            Next available:{' '}
                            {format(new Date(chef.nextAvailable), 'MMM dd, yyyy')}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{chef.languages.join(', ')}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="mb-2 text-sm font-semibold">{chef.serviceCategory}</p>
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

                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {chef.bio}
                </p>

                <Link to={`/netherlands/chef/${chef.id}`}>
                    <Button className="w-full">View Details</Button>
                </Link>
            </CardContent>
        </Card>
    );
}
