import { Star, CheckCircle } from 'lucide-react';
import { Review } from '@/types';
import { Card, CardContent } from '../ui/card';
import { format } from 'date-fns';

interface ReviewsTabProps {
    reviews: Review[];
}

export function ReviewsTab({ reviews }: ReviewsTabProps) {
    if (reviews.length === 0) {
        return (
            <div className="rounded-xl bg-background p-12 text-center">
                <p className="text-muted-foreground">No reviews yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <Card key={review.id}>
                    <CardContent className="p-6">
                        <div className="mb-3 flex items-start justify-between">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <h3 className="font-semibold">{review.customerName}</h3>
                                    {review.verified && (
                                        <CheckCircle className="h-4 w-4 text-primary" />
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-primary text-primary"
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {format(new Date(review.date), 'MMM dd, yyyy')}
                            </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
