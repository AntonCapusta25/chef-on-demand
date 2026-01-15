import { HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';

export function FloatingHelp() {
    return (
        <Button
            size="icon"
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
            aria-label="Help"
        >
            <HelpCircle className="h-6 w-6" />
        </Button>
    );
}
