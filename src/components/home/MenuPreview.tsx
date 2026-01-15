
import { motion } from 'framer-motion';

const cuisines = [
    {
        id: 'suriname',
        title: 'Suriname Soul Food',
        image: '/images/menu-surinami.png',
        description: 'Authentic flavors from Suriname'
    },
    {
        id: 'asian',
        title: 'Asian Fusion',
        image: '/images/menu-fusion-new.png',
        description: 'A blend of traditional and modern Asian dishes'
    },
    {
        id: 'indian',
        title: 'Indian Spices',
        image: '/images/menu-indian-new.png',
        description: 'Rich and aromatic Indian curries'
    },
    {
        id: 'italian',
        title: 'Classic Italian',
        image: '/images/menu-italian-new.png',
        description: 'Handmade pasta and authentic recipes'
    },
    {
        id: 'veggie',
        title: 'Vegetarian Delights',
        image: '/images/menu-veggie-new.png',
        description: 'Fresh, healthy, and delicious plant-based meals'
    },
    {
        id: 'seafood',
        title: 'Premium Seafood',
        image: '/images/menu-seafood-new.png',
        description: 'Fresh catches prepared to perfection'
    },
];

export function MenuPreview() {
    const scrollToBooking = () => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl text-dark mb-4">Explore Our Cuisines</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover a world of flavors prepared by our expert chefs for your event.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cuisines.map((cuisine, index) => (
                        <motion.div
                            key={cuisine.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer"
                            onClick={scrollToBooking}
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src={cuisine.image}
                                    alt={cuisine.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="font-heading text-2xl mb-2">{cuisine.title}</h3>
                                <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-100 mb-4">
                                    {cuisine.description}
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        scrollToBooking();
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-200 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-medium"
                                >
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
