import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs, faqCategories } from '@/data/faqs';

export function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [openId, setOpenId] = useState<number | null>(null);

    const filteredFaqs = selectedCategory
        ? faqs.filter((faq) => faq.category === selectedCategory)
        : faqs;

    return (
        <div className="min-h-screen bg-muted/30 py-12">
            <div className="container px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 text-center">
                        <h1 className="mb-4 text-4xl font-bold">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Find answers to common questions about our service
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-8 flex flex-wrap justify-center gap-2">
                        <button
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === null
                                    ? 'bg-primary text-white'
                                    : 'bg-background hover:bg-muted'
                                }`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            All
                        </button>
                        {faqCategories.map((category) => (
                            <button
                                key={category}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === category
                                        ? 'bg-primary text-white'
                                        : 'bg-background hover:bg-muted'
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {filteredFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="overflow-hidden rounded-lg border bg-background"
                            >
                                <button
                                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                >
                                    <div>
                                        <span className="mb-1 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                            {faq.category}
                                        </span>
                                        <h3 className="font-semibold">{faq.question}</h3>
                                    </div>
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
                </div>
            </div>
        </div>
    );
}
