


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
                                filter: 'brightness(0) invert(1)' // White filter
                            }}
                        />
                        <p className="text-white/60 leading-relaxed">
                            Savor the Magic. Bringing world-class culinary experiences directly to your event.
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="space-y-6 md:col-span-2 flex flex-col items-center md:items-end md:justify-center mt-8 md:mt-0">
                        <h4 className="font-bold text-lg text-white">Follow Us</h4>
                        <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
                            {[
                                { href: "https://www.tiktok.com/@homemademealsnl", alt: "TikTok", src: "https://cdn.prod.website-files.com/67ca169b9408c827cc9df330/67ca169b9408c827cc9df3f8_tiktok-brands.svg" },
                                { href: "https://www.instagram.com/homemade.bv/", alt: "Instagram", src: "https://cdn.prod.website-files.com/67ca169b9408c827cc9df330/67ca169b9408c827cc9df3f7_instagram-brands.svg" },
                                { href: "https://www.facebook.com/homemademeals.net", alt: "Facebook", src: "https://cdn.prod.website-files.com/67ca169b9408c827cc9df330/67ca169b9408c827cc9df368_Homemade_dark-15%20(1).png" },
                                { href: "https://x.com/Homemade___", alt: "X (Twitter)", src: "https://cdn.prod.website-files.com/67ca169b9408c827cc9df330/67ca169b9408c827cc9df3d8_x-twitter-brands.svg" },
                                { href: "https://nl.pinterest.com/HomemadeBV/", alt: "Pinterest", src: "https://cdn.prod.website-files.com/67ca169b9408c827cc9df330/67ca169b9408c827cc9df3fa_pinterest-brands.svg" },
                                { href: "https://youtube.com/@homemade-nl?si=9VNI_EKSR-n6P7pW", alt: "YouTube", src: "https://cdn.prod.website-files.com/67ca169b9408c827cc9df330/67ca169b9408c827cc9df3f5_youtube-brands-solid.svg" },
                                { href: "mailto:Chefs@homemademeals.net", alt: "Email", src: "https://cdn.prod.website-files.com/67ca169b9408c827cc9df330/67ca169b9408c827cc9df3f3_envelope-solid.svg" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-2"
                                >
                                    <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <img
                                        width="22"
                                        loading="lazy"
                                        alt={social.alt}
                                        src={social.src}
                                        className="relative z-10 transition-all duration-300 transform group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                        style={{
                                            filter: 'brightness(0) invert(1)' // White filter
                                        }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} Homemade B.V. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
