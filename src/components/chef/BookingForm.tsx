import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Users, Plus, Minus, CheckCircle, AlertCircle } from 'lucide-react';
import { Chef, BookingFormData } from '@/types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { format, addDays } from 'date-fns';
import { submitChefBooking } from '@/lib/bookings';

interface BookingFormProps {
    chef: Chef;
}

const serviceTypes = [
    {
        id: 'cook-dine',
        name: 'Cook & Dine Now',
        description: 'Chef prepares and serves meal immediately',
    },
    {
        id: 'prepare-store',
        name: 'Prepare & Store for Later',
        description: 'Chef prepares meals for the week',
    },
];

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
];

export function BookingForm({ chef }: BookingFormProps) {
    const [serviceType, setServiceType] = useState('cook-dine');
    const [guestCount, setGuestCount] = useState(2);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, reset } = useForm<BookingFormData>();

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        const bookingData: BookingFormData = {
            ...data,
            serviceType,
            guestCount,
            date: selectedDate,
            time: selectedTime,
        };

        const result = await submitChefBooking(chef, bookingData);

        setIsSubmitting(false);

        if (result.success) {
            setSubmitStatus('success');
            // Reset form
            reset();
            setServiceType('cook-dine');
            setGuestCount(2);
            setSelectedDate(null);
            setSelectedTime('');

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setSubmitStatus('error');
            setErrorMessage(result.error || 'Failed to submit booking. Please try again.');
        }
    };

    // Generate next 14 days for date selection
    const availableDates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

    const subtotal = chef.pricePerGuest * guestCount;

    return (
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
                {/* Success Message */}
                {submitStatus === 'success' && (
                    <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <div>
                                    <h3 className="font-semibold text-green-900">Booking Confirmed!</h3>
                                    <p className="mt-1 text-sm text-green-700">
                                        Your booking has been submitted successfully. You will receive a confirmation email shortly at the address you provided.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-6 w-6 text-red-600" />
                                <div>
                                    <h3 className="font-semibold text-red-900">Booking Failed</h3>
                                    <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {/* Service Type Selection */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-semibold">Select Service Type</h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {serviceTypes.map((type) => (
                                <button
                                    key={type.id}
                                    className={`rounded-lg border-2 p-4 text-left transition-colors ${serviceType === type.id
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                    onClick={() => setServiceType(type.id)}
                                >
                                    <div className="font-semibold">{type.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {type.description}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Guest Count */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-semibold">Number of Guests</h3>
                        <div className="flex items-center gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">{guestCount}</span>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setGuestCount(guestCount + 1)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Date Selection */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                            <Calendar className="h-5 w-5" />
                            Select Date
                        </h3>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                            {availableDates.map((date) => (
                                <button
                                    key={date.toISOString()}
                                    type="button"
                                    className={`rounded-lg border p-3 text-center transition-colors ${selectedDate?.toDateString() === date.toDateString()
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                    onClick={() => setSelectedDate(date)}
                                >
                                    <div className="text-xs">{format(date, 'EEE')}</div>
                                    <div className="text-lg font-bold">{format(date, 'd')}</div>
                                    <div className="text-xs">{format(date, 'MMM')}</div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Time Selection */}
                {selectedDate && (
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                <Clock className="h-5 w-5" />
                                Select Time
                            </h3>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        className={`rounded-lg border p-3 text-center transition-colors ${selectedTime === time
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-border hover:border-primary/50'
                                            }`}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Meal Details */}
                {selectedTime && (
                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="mb-2 block font-semibold">
                                        What do you want the chef to prepare?
                                    </label>
                                    <Textarea
                                        {...register('mealDescription', { required: true })}
                                        placeholder="Describe your meal preferences..."
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-semibold">
                                        Dietary Requirements
                                    </label>
                                    <Textarea
                                        {...register('dietaryRequirements')}
                                        placeholder="Any allergies or dietary restrictions?"
                                        rows={2}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-semibold">
                                        Additional Notes
                                    </label>
                                    <Textarea
                                        {...register('notes')}
                                        placeholder="Any special requests?"
                                        rows={2}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block font-semibold">Full Name</label>
                                        <Input
                                            {...register('fullName', { required: true })}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block font-semibold">Email</label>
                                        <Input
                                            {...register('email', { required: true })}
                                            type="email"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block font-semibold">Phone Number</label>
                                        <Input
                                            {...register('phone', { required: true })}
                                            placeholder="+20 123 456 7890"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block font-semibold">Address</label>
                                        <Input
                                            {...register('address', { required: true })}
                                            placeholder="Your address"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block font-semibold">
                                        Special Arrival Instructions
                                    </label>
                                    <Textarea
                                        {...register('arrivalInstructions')}
                                        placeholder="Building number, apartment, etc."
                                        rows={2}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-semibold">Booking Summary</h3>

                        <div className="mb-4 flex items-center gap-3">
                            <img
                                src={chef.photo}
                                alt={chef.name}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                            <div>
                                <div className="font-semibold">{chef.name}</div>
                                <div className="text-sm text-muted-foreground">
                                    {chef.serviceCategory}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 border-t pt-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Service Type:</span>
                                <span className="font-medium">
                                    {serviceTypes.find((t) => t.id === serviceType)?.name}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Guests:</span>
                                <span className="font-medium">{guestCount}</span>
                            </div>

                            {selectedDate && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Date:</span>
                                    <span className="font-medium">
                                        {format(selectedDate, 'MMM dd, yyyy')}
                                    </span>
                                </div>
                            )}

                            {selectedTime && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Time:</span>
                                    <span className="font-medium">{selectedTime}</span>
                                </div>
                            )}

                            <div className="border-t pt-3">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span className="text-lg font-bold text-primary">
                                        €{subtotal}
                                    </span>
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    €{chef.pricePerGuest} per guest
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
