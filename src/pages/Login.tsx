import { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Login() {
    const [method, setMethod] = useState<'phone' | 'email'>('phone');

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
                    <p className="text-center text-sm text-muted-foreground">
                        Login to book your chef or manage your bookings
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 flex gap-2">
                        <Button
                            variant={method === 'phone' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setMethod('phone')}
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            Phone
                        </Button>
                        <Button
                            variant={method === 'email' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setMethod('email')}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                        </Button>
                    </div>

                    <form className="space-y-4">
                        {method === 'phone' ? (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="+20 123 456 7890"
                                    />
                                </div>
                                <Button className="w-full">Send Verification Code</Button>
                                <p className="text-center text-xs text-muted-foreground">
                                    We'll send you a verification code via SMS
                                </p>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <Button className="w-full">Login</Button>
                            </>
                        )}
                    </form>

                    <p className="mt-6 text-center text-xs text-muted-foreground">
                        Don't have an account? One will be created automatically when you
                        make your first booking.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
