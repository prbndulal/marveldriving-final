import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

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
        const { bookingId, sessionId } = await req.json();

        if (!bookingId || !sessionId) {
            return NextResponse.json({ error: 'Missing bookingId or sessionId' }, { status: 400 });
        }

        const stripe = getStripe();
        if (!stripe) {
            return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
        }

        // Verify the Stripe session is actually paid
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return NextResponse.json({ error: 'Payment not completed' }, { status: 402 });
        }

        // Guard: only update if the metadata matches the booking to prevent spoofing
        if (session.metadata?.bookingId !== bookingId) {
            return NextResponse.json({ error: 'Session mismatch' }, { status: 403 });
        }

        // Update the booking
        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                paymentStatus: 'paid',
                status: 'confirmed',
                stripeId: session.id,
            },
        });

        return NextResponse.json({ success: true, booking });
    } catch (error: any) {
        console.error('CONFIRM_PAYMENT_ERROR', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
