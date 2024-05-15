import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await stripe.checkout.sessions.expire(params.id);

        return NextResponse.json({ data: session });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
