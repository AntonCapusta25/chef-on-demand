import { HeroSection } from '../components/home/HeroSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ChefListings } from '../components/home/ChefListings';
import { FAQSection } from '../components/home/FAQSection';

export function Home() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <TestimonialsSection />
            <ChefListings />
            <FAQSection />
        </div>
    );
}
