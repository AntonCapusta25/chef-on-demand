import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export function Header() {
    return (
        <header className="w-full border-b bg-white">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center">
                    <img
                        src="/images/logo-homemade.png"
                        alt="Homemade"
                        className="h-12 w-auto object-contain"
                    />
                </Link>

                <nav className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Netherlands</span>
                    </div>
                    <Link
                        to="/safety-guidelines"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Safety Guidelines
                    </Link>
                </nav>
            </div>
        </header>
    );
}
