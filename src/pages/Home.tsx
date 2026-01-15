import { HeroSection } from '../components/home/HeroSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { MenuPreview } from '../components/home/MenuPreview';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FAQSection } from '../components/home/FAQSection';
import { CateringBookingSection } from '../components/home/CateringBookingSection';
import { Footer } from '../components/layout/Footer';

export function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <HeroSection />
            <PartnersSection />
            <MenuPreview />
            <TestimonialsSection />
            <FAQSection />
            <CateringBookingSection />
            <Footer />
        </div>
    );
}
