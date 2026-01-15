import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { faqs } from '@/data/faqs';

export function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(null);

    // Show only first 4 FAQs on homepage
    const displayedFaqs = faqs.slice(0, 4);

    return (
        <section className="bg-muted/30 py-16">
            <div className="container px-4">
                <h2 className="mb-10 text-center text-3xl font-bold">
                    Frequently Asked Questions
                </h2>

                <div className="mx-auto max-w-3xl space-y-4">
                    {displayedFaqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="overflow-hidden rounded-lg border bg-background"
                        >
                            <button
                                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                            >
                                <span className="font-semibold">{faq.question}</span>
                                <ChevronDown
                                    className={`h-5 w-5 transition-transform ${openId === faq.id ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            {openId === faq.id && (
                                <div className="border-t px-6 py-4 text-muted-foreground">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link to="/faqs">
                        <Button variant="outline">View All FAQs</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
