
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-[#1a1412] text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        {/* <h3 className="font-heading text-2xl text-primary">Chef On-Demand</h3> */}
                        <img
                            src="/images/logo-homemade.png"
                            alt="Homemade Logo"
                            className="h-16 object-contain"
                            style={{
                                filter: 'brightness(0) saturate(100%) invert(86%) sepia(16%) saturate(464%) hue-rotate(349deg) brightness(96%) contrast(88%)' // Beige filter
                            }}
                        />
                        <p className="text-white/60 leading-relaxed">
                            Savor the Magic. Bringing world-class culinary experiences directly to your event.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-lg">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-white/60 hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-white/60 hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-white/60 hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-lg">Legal</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-white/60 hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} Chef On-Demand. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
