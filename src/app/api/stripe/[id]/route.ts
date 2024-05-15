import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const product = (await stripe.products.list()).data.find(el => el.default_price == params.id);
        const price = (await stripe.prices.list()).data.find(el => product.default_price == el.id)

        const data = {
            name: product.name,
            image: product.images[0],
            price: price.unit_amount_decimal.slice(0, price.unit_amount_decimal.length - 2),
            recurring: price.recurring.interval,
            monthly: price.recurring.interval == 'year'
                ? Number(price.unit_amount_decimal.slice(0, price.unit_amount_decimal.length - 2)) / 12
                : Number(price.unit_amount_decimal.slice(0, price.unit_amount_decimal.length - 2)),
            totalYear: price.recurring.interval == 'year'
                ? Number(price.unit_amount_decimal.slice(0, price.unit_amount_decimal.length - 2))
                : Number(price.unit_amount_decimal.slice(0, price.unit_amount_decimal.length - 2)) * 12,
            priceId: price.id
        }

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await stripe.checkout.sessions.expire(params.id);

        return NextResponse.json({ data: session });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const product = (await stripe.products.list()).data.find(el => el.default_price == params.id);

        const deleted = await stripe.products.update(product.id, {
            active: false
        });

        return NextResponse.json({ data: deleted });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const form = await request.formData()

        const name = form.get('name').toString()
        const recurring = form.get('recurring').toString()
        const monthly = form.get('price').toString()

        const product = (await stripe.products.list()).data.find(el => el.default_price == params.id);
        const price = (await stripe.prices.list()).data.find(el => el.id == params.id)

        // const updatedProduct = await stripe.products.update(product.id, { name });
        // const updatedPrice = await stripe.prices.update(product.id, {  });

        return NextResponse.json({ data: 'updated' });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
