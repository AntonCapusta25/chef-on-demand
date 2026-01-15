import { Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const testimonials = [
    {
        id: 1,
        name: 'Syukri Ainun Alfatg',
        restaurant: 'Bhojon Rosona',
        rating: 5,
        date: 'Sat 3 Jan',
        comment: 'I ordered from Bottega da Dome a few times and they have hands down the best tiramisu! Will keep ordering from them again :)',
    },
    {
        id: 2,
        name: 'Jo-anne',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Fri 2 Jan',
        comment: 'Very very tasty! The kruidnoten special was so so so good too. Lovely service too. Great work',
    },
    {
        id: 3,
        name: 'M A Van Der Waal',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Sat 27 Dec',
        comment: "Delicious!! Approved by my tiramisu loved boyfriend. He said it's the best he's ever had!",
    },
    {
        id: 4,
        name: 'Lytsy',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Sat 27 Dec',
        comment: 'Really good!!!!',
    },
    {
        id: 5,
        name: 'Priscille',
        restaurant: 'La Esquina Dominicana',
        rating: 5,
        date: 'Tue 23 Dec',
        comment: 'Lekker!',
    },
    {
        id: 6,
        name: 'Swikar',
        restaurant: 'Curry Campus',
        rating: 5,
        date: 'Mon 22 Dec',
        comment: 'Very good! We chose Indian spicy instead of Dutch spicy. It was very tasteful and for us, who are used to spicy food, not too spicy. Just perfect.',
    },
    {
        id: 7,
        name: 'Sanne',
        restaurant: 'Curry Campus',
        rating: 5,
        date: 'Sun 21 Dec',
        comment: 'Nice butter chicken and rice. Not too spicy just a solid dish.',
    },
    {
        id: 8,
        name: 'Sanne',
        restaurant: 'Spice Road',
        rating: 5,
        date: 'Fri 12 Dec',
        comment: 'Lekker eten, goede service, vriendelijk',
    },
    {
        id: 9,
        name: 'Priscille',
        restaurant: 'La Esquina Dominicana',
        rating: 5,
        date: 'Wed 10 Dec',
        comment: 'Heel lekker',
    },
    {
        id: 10,
        name: 'Lem',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Wed 10 Dec',
        comment: 'The tiramisu was delicious! 😋 Domenico and Isa are extremely friendly and the service is great. 10/10!',
    },
    {
        id: 11,
        name: 'Carlo Alberto',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Thu 4 Dec',
        comment: 'Ordered Tiramisú for my Bday instead of the regular Bday cake!!! What to say... Best choice ever!!! All my friends loved it and Domenico fulfilled my order with only 48 hours to go before my party! Ordered 3 trays and we finished all of it!! Thanks Dome, I knew I could count on you!',
    },
    {
        id: 12,
        name: 'Victor Pedersen',
        restaurant: 'Curry Campus',
        rating: 5,
        date: 'Thu 4 Dec',
        comment: 'Amazing as always! Echt geweldig, zoals altijd!',
    },
    {
        id: 13,
        name: 'Syrine',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Thu 4 Dec',
        comment: 'This is by far one of the best Tiramisu I have tasted! It somehow melts inside the mouth! Super Good!!',
    },
    {
        id: 14,
        name: 'Louis Hu',
        restaurant: 'Mandarin Garden',
        rating: 5,
        date: 'Wed 3 Dec',
        comment: 'I miss you, come back',
    },
    {
        id: 15,
        name: 'Sibbir',
        restaurant: "Nishu's Biryani House",
        rating: 5,
        date: 'Mon 1 Dec',
        comment: 'The biryani was very hearty and tasty! Good portion with chicken and potatoes. Definitely will order again',
    },
    {
        id: 16,
        name: 'Robert',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Thu 27 Nov',
        comment: 'Delicious tiramisu! We all loved it. Very well made and Domenico is a very friendly chef. Will order again!',
    },
    {
        id: 17,
        name: 'Dytaysha',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Wed 12 Nov',
        comment: "Absolutely delicious, authentic tiramisu's. Once you try these tiramisu's, you'll get hooked and no other tiramisu will ever taste as good. The ratios are perfectly balanced. Perfezione in every bite!! The service is excellent, I highly recommend!!",
    },
    {
        id: 18,
        name: 'Filip',
        restaurant: 'La Esquina Dominicana',
        rating: 5,
        date: 'Tue 11 Nov',
        comment: 'The food was amazing, steak was cooked perfectly with tasty chimichurri, and the empanada was exactly how authentic empanadas should taste!',
    },
    {
        id: 19,
        name: 'Sverre',
        restaurant: 'Spice Road',
        rating: 5,
        date: 'Tue 11 Nov',
        comment: 'Top, erg lekker , lang geleden sinds ik zo een goede nasi had',
    },
    {
        id: 20,
        name: 'Isabella Noguera',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Mon 10 Nov',
        comment: 'So creamy and tasty love it. - Feriale (Oriental Nails)',
    },
    {
        id: 21,
        name: 'Sachinthani',
        restaurant: "Nishu's Biryani House",
        rating: 5,
        date: 'Mon 10 Nov',
        comment: 'Tasty good portion..',
    },
    {
        id: 22,
        name: 'Sanne',
        restaurant: 'Curry Campus',
        rating: 5,
        date: 'Sun 9 Nov',
        comment: 'Amazing again!!! Love it:)',
    },
    {
        id: 23,
        name: 'Djordi',
        restaurant: 'Curry Campus',
        rating: 5,
        date: 'Sun 9 Nov',
        comment: 'Good amount of food for the price. Taste was also really good. Restaurant quality food 👌.',
    },
    {
        id: 24,
        name: 'Jhansi',
        restaurant: 'Curry Campus',
        rating: 5,
        date: 'Sun 9 Nov',
        comment: 'Love the biryani!!!',
    },
    {
        id: 25,
        name: 'Carlos Noguera',
        restaurant: 'Bottega da Dome',
        rating: 5,
        date: 'Wed 5 Nov',
        comment: "Definitely recommend this authentic Tiramisu. Won't disappoint and you will definitely want to order again.",
    },
];

export function TestimonialsSection() {
    return (
        <section className="bg-muted/50 py-16">
            <div className="container px-4">
                <h2 className="mb-10 text-center text-3xl font-bold">
                    What Our Customers Say
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id}>
                            <CardContent className="pt-6">
                                <div className="mb-4 flex items-center gap-1">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-primary text-primary"
                                        />
                                    ))}
                                </div>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    "{testimonial.comment}"
                                </p>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {testimonial.restaurant} • {testimonial.date}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
