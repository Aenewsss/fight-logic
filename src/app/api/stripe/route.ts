import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
    try {
        const { data: productsData } = await stripe.products.list();

        const { data: pricesData } = await stripe.prices.list();

        const data = productsData
            .filter(el => el.active)
            .map(el => ({ name: el.name, price: el.default_price }))
            .map(product => ({ ...product, price: pricesData.find(priceData => priceData.id == product.price).unit_amount_decimal, recurring: pricesData.find(priceData => priceData.id == product.price).recurring.interval, priceId: pricesData.find(priceData => priceData.id == product.price).id }))
            .map(product => (
                {
                    ...product,
                    price: product.price.slice(0, product.price.length - 2),
                    monthly: product.recurring == 'year'
                        ? Number(product.price.slice(0, product.price.length - 2)) / 12
                        : Number(product.price.slice(0, product.price.length - 2)),
                    totalYear: product.recurring == 'year'
                        ? Number(product.price.slice(0, product.price.length - 2))
                        : Number(product.price.slice(0, product.price.length - 2)) * 12
                }))

        return NextResponse.json({ data });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json()

        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento?success=true&session={CHECKOUT_SESSION_ID}`,
            line_items: [
                {
                    price: body.priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            customer_email: body.customer_email
        });

        return NextResponse.json({ data: session });
    } catch (err) {
        console.error(err.message)
        return NextResponse.json({ error: "Error checkout session" });
    }
}
