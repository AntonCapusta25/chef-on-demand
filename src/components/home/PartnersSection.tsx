const partners = [
    { name: 'El Nino', logo: '/images/partners/el-nino.png', className: 'w-32' },
    { name: 'Upfront', logo: '/images/partners/upfront.png', className: 'w-36 md:w-44' }, // Slightly smaller than before
    { name: 'Sure Mobility', logo: '/images/partners/sure-mobility.png', className: 'w-56 md:w-64' }, // Much bigger
    { name: 'UTwente', logo: '/images/partners/utwente.png', className: 'w-32' },
    { name: 'Novel-T', logo: '/images/partners/novel-t.png', className: 'w-32' },
    { name: 'Create Tomorrow', logo: '/images/partners/create-tomorrow.png', className: 'w-32' },
];

export function PartnersSection() {
    // Duplicate locally to ensure strip is wide enough (prevent whitespace on large screens)
    const displayPartners = [...partners, ...partners];

    return (
        <section className="py-20 bg-white overflow-hidden border-y border-gray-100">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h3 className="font-heading text-2xl text-dark relative inline-block">
                    Proudly Partnering With
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary/20 rounded-full"></span>
                </h3>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Strip 1 */}
                <div className="flex shrink-0 animate-marquee items-center gap-32 pr-32">
                    {displayPartners.map((partner, index) => (
                        <div
                            key={`s1-${index}`}
                            className="flex items-center justify-center shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                        >
                            <img
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                className={`h-auto object-contain ${partner.className}`}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Strip 2 (Identical Copy) */}
                <div className="flex shrink-0 animate-marquee items-center gap-32 pr-32" aria-hidden="true">
                    {displayPartners.map((partner, index) => (
                        <div
                            key={`s2-${index}`}
                            className="flex items-center justify-center shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
                        >
                            <img
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                className={`h-auto object-contain ${partner.className}`}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
