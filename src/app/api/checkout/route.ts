import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from "@/lib/prisma";

// Lazy initialize Stripe to avoid build-time errors if environment variables are missing
let stripeInstance: Stripe | null = null;

function getStripe() {
    if (!stripeInstance && process.env.STRIPE_SECRET_KEY) {
        stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-12-18.acacia' as any,
        });
    }
    return stripeInstance;
}

export async function POST(req: Request) {
    try {
        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('sample')) {
            throw new Error('STRIPE_SECRET_KEY is missing or invalid in your environment variables.');
        }

        if (!process.env.NEXT_PUBLIC_BASE_URL) {
            throw new Error('NEXT_PUBLIC_BASE_URL is not defined.');
        }

        const body = await req.json();
        const {
            customerName,
            customerEmail,
            customerPhone,
            serviceName,
            price,
            date,
            time
        } = body;

        // Clean price string
        const numericPrice = typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, '')) : price;

        const stripe = getStripe();
        if (!stripe) {
            throw new Error('Stripe is not configured. STRIPE_SECRET_KEY may be missing.');
        }

        // 1. Conflict check + booking creation in a transaction to prevent race conditions
        let booking;
        try {
            booking = await prisma.$transaction(async (tx) => {
                const existing = await tx.booking.findFirst({
                    where: {
                        date: new Date(date),
                        time: time,
                        status: { in: ['pending', 'confirmed'] }
                    }
                });

                if (existing) {
                    throw new Error("SLOT_TAKEN");
                }

                return tx.booking.create({
                    data: {
                        customerName,
                        customerEmail,
                        customerPhone,
                        serviceName,
                        servicePrice: numericPrice,
                        date: new Date(date),
                        time: time,
                        status: 'pending',
                        paymentStatus: 'unpaid'
                    }
                });
            });
        } catch (txError: any) {
            if (txError.message === "SLOT_TAKEN") {
                return NextResponse.json({ error: "This time slot is already booked." }, { status: 400 });
            }
            throw txError;
        }

        // 3. Create the Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: customerEmail,
            line_items: [
                {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: serviceName,
                            description: `${serviceName} on ${date} at ${time}`,
                        },
                        unit_amount: numericPrice * 100, // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book?status=success&booking_id=${booking.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book?status=cancelled&booking_id=${booking.id}`,
            metadata: {
                bookingId: booking.id,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('STRIIPE_ERROR', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
