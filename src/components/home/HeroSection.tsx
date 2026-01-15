import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    const scrollToChefs = () => {
        const chefsSection = document.getElementById('chefs-section');
        if (chefsSection) {
            chefsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 md:py-32" style={{ backgroundColor: '#FDFDFD' }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <span className="text-primary font-semibold tracking-wider text-sm uppercase">
                            New | Netherlands
                        </span>

                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl leading-tight">
                            Skip the cooking, enjoy the meal!
                        </h1>

                        <p className="text-lg text-gray-700 max-w-[550px] leading-relaxed">
                            Too busy to cook? Whether you're hosting a gathering or need daily meal prep,
                            our vetted expert chefs bring fresh, homemade meals straight to your table.
                            No stress, no hassle—just great food.
                        </p>

                        <div>
                            <Button
                                onClick={scrollToChefs}
                                size="lg"
                                className="inline-flex items-center gap-2 h-12 px-8 py-3 shadow-sm hover:shadow active:scale-[0.98] active:shadow-inner transition-all duration-200"
                            >
                                Find Your Chef
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Column - Illustration */}
                    <div className="hidden lg:block relative">
                        <img
                            src="/hero-illustration.png"
                            alt="Chef Services Illustration"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
