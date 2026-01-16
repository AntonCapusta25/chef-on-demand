
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Utensils, Star, ArrowRight } from 'lucide-react';
import { submitCateringInquiry, type CateringInquiry } from '../../lib/catering';

export function CateringBookingSection() {
    const [formData, setFormData] = useState<CateringInquiry>({
        menu_preference: 'Custom', // Default to Custom since field is hidden
        chef_preference: '',
        cuisine_style: '',
        event_date: '',
        guest_count: 2, // Default to 2 guests
        name: '',
        email: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [honeypot, setHoneypot] = useState('');
    const [cooldownTime, setCooldownTime] = useState(0);

    // Check rate limiting on mount
    useEffect(() => {
        const lastSubmission = localStorage.getItem('lastCateringSubmission');
        if (lastSubmission) {
            const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
            const cooldownDuration = 5 * 60 * 1000; // 5 minutes
            if (timeSinceLastSubmission < cooldownDuration) {
                setCooldownTime(Math.ceil((cooldownDuration - timeSinceLastSubmission) / 1000));
            }
        }
    }, []);

    // Cooldown timer
    useEffect(() => {
        if (cooldownTime > 0) {
            const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldownTime]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot check - if filled, it's a bot
        if (honeypot) {
            console.log('Bot detected');
            return;
        }

        // Rate limiting check
        if (cooldownTime > 0) {
            alert(`Please wait ${Math.floor(cooldownTime / 60)}:${(cooldownTime % 60).toString().padStart(2, '0')} before submitting again.`);
            return;
        }

        setStatus('submitting');
        try {
            await submitCateringInquiry(formData);
            setStatus('success');

            // Set rate limit
            localStorage.setItem('lastCateringSubmission', Date.now().toString());
            setCooldownTime(5 * 60); // 5 minutes

            setFormData({
                menu_preference: 'Custom', // Default to Custom since field is hidden
                cuisine_style: '',
                event_date: '',
                guest_count: 2,
                name: '',
                email: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
            // Log for debugging
            if (error instanceof Error) {
                alert(`Submission failed: ${error.message}`);
            } else {
                alert('Submission failed with an unknown error');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'guest_count' ? parseInt(value) || 0 : value
        }));
    };

    const incrementGuests = () => {
        setFormData(prev => ({
            ...prev,
            guest_count: Math.min(prev.guest_count + 1, 100)
        }));
    };

    const decrementGuests = () => {
        setFormData(prev => ({
            ...prev,
            guest_count: Math.max(prev.guest_count - 1, 1)
        }));
    };

    return (
        <section id="booking" className="py-24 relative overflow-hidden bg-[#241c19]">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Left Content (Wider) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 lg:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3a2e2a] border border-white/5 text-[#d48c66] text-sm font-medium">
                            <span className="text-[#f47a42]">✨</span> Exclusive Culinary Experiences
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-heading text-5xl md:text-6xl text-white">Reserve Your</h2>
                            <h2 className="font-heading text-5xl md:text-6xl text-[#f47a42]">Catering Service</h2>
                        </div>

                        <p className="text-lg text-white/60 leading-relaxed max-w-md">
                            From corporate events to celebrations, we deliver exceptional catering
                            experiences tailored to your needs.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#3a2e2a] flex items-center justify-center text-[#f47a42]">
                                    <Star size={18} fill="currentColor" />
                                </div>
                                <span className="text-white/80 text-sm font-medium">5-Star Rated Chefs</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#3a2e2a] flex items-center justify-center text-[#f47a42]">
                                    <Utensils size={18} />
                                </div>
                                <span className="text-white/80 text-sm font-medium">Custom Curated Menus</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Form Card (Narrower) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#2c2420] p-8 rounded-3xl border border-white/5 shadow-2xl relative lg:col-span-5"
                    >
                        {/* Form Outline Glow */}
                        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative">

                            {/* Select Menu - REMOVED */}


                            {/* Cuisine Style */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold pl-1">Cuisine Style</label>
                                <div className="relative">
                                    <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <input
                                        type="text"
                                        name="cuisine_style"
                                        value={formData.cuisine_style}
                                        onChange={handleChange}
                                        placeholder="e.g. Italian"
                                        className="w-full bg-[#3a2e2a] border border-transparent hover:border-white/10 focus:border-[#f47a42]/50 rounded-xl px-4 py-3.5 pl-12 text-white/90 focus:outline-none transition-all placeholder:text-white/30"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Event Details Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold pl-1 flex items-center gap-2">
                                        <Calendar size={14} className="text-white/30" />
                                        Event Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="event_date"
                                            value={formData.event_date}
                                            onChange={handleChange}
                                            className="w-full bg-[#3a2e2a] border border-transparent hover:border-white/10 focus:border-[#f47a42]/50 rounded-xl px-4 py-3.5 text-white/90 focus:outline-none transition-all [color-scheme:dark]"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-wider text-white/40 font-semibold pl-1 flex items-center gap-2">
                                        <Users size={14} className="text-white/30" />
                                        Number of Guests
                                    </label>
                                    <div className="flex items-center bg-[#3a2e2a] border border-transparent hover:border-white/10 focus-within:border-[#f47a42]/50 rounded-xl overflow-hidden transition-all">
                                        <button
                                            type="button"
                                            onClick={decrementGuests}
                                            className="px-5 py-3.5 text-white/60 hover:text-[#f47a42] hover:bg-white/5 transition-all border-r border-white/5"
                                            aria-label="Decrease guest count"
                                        >
                                            <span className="text-lg font-bold">−</span>
                                        </button>
                                        <input
                                            type="number"
                                            name="guest_count"
                                            value={formData.guest_count}
                                            onChange={handleChange}
                                            className="flex-1 bg-transparent text-center text-white/90 focus:outline-none px-4 py-3.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            min="1"
                                            max="100"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={incrementGuests}
                                            className="px-5 py-3.5 text-white/60 hover:text-[#f47a42] hover:bg-white/5 transition-all border-l border-white/5"
                                            aria-label="Increase guest count"
                                        >
                                            <span className="text-lg font-bold">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full bg-[#3a2e2a] border border-transparent hover:border-white/10 focus:border-[#f47a42]/50 rounded-xl px-4 py-3.5 pl-4 text-white/90 focus:outline-none transition-all placeholder:text-white/30"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full bg-[#3a2e2a] border border-transparent hover:border-white/10 focus:border-[#f47a42]/50 rounded-xl px-4 py-3.5 pl-4 text-white/90 focus:outline-none transition-all placeholder:text-white/30"
                                    required
                                />
                            </div>

                            {/* Honeypot field - hidden from users, catches bots */}
                            <input
                                type="text"
                                name="website"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                className="absolute opacity-0 pointer-events-none"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                            />

                            <button
                                type="submit"
                                disabled={status === 'submitting' || cooldownTime > 0}
                                className="w-full bg-gradient-to-r from-[#f47a42] to-[#ff9f6d] hover:to-[#f47a42] text-white font-semibold py-4 rounded-xl transition-all duration-300 transform shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? 'Booking...' : cooldownTime > 0 ? (
                                    `Wait ${Math.floor(cooldownTime / 60)}:${(cooldownTime % 60).toString().padStart(2, '0')}`
                                ) : (
                                    <>
                                        Book Now <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <div className="text-center space-y-1">
                                <p className="text-white/30 text-[10px]">No payment required instantly.</p>
                                <p className="text-white/30 text-[10px]">You'll be contacted to finalize details.</p>
                            </div>

                            {status === 'success' && (
                                <div className="absolute inset-0 bg-[#2c2420]/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-3xl text-center p-6">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
                                    <p className="text-white/60 text-sm">We'll be in touch shortly to confirm your booking.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-6 text-[#f47a42] hover:text-[#ff9f6d] text-sm font-medium"
                                    >
                                        Send another request
                                    </button>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
