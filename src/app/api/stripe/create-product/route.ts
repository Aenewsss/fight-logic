import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
        const form = await request.formData()
        const name = form.get('name').toString()
        const recurring = form.get('recurring').toString()
        const monthly = form.get('price').toString()

        const calcAmount = (amount) => {
            if (recurring == 'year') return amount * 12
            else return amount
        }

        await stripe.products.create({
            name, default_price_data: {
                currency: 'brl',
                unit_amount: Number(calcAmount(Number(monthly)).toString() + '00'),
                recurring: {
                    interval: recurring as any,
                },
            }
        });

        return NextResponse.json({ data: 'created' });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
