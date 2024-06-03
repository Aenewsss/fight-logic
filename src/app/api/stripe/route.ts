import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as nodemailer from "nodemailer"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function GET(request: NextRequest) {
    try {
        const { data: productsData } = await stripe.products.list();

        const { data: pricesData } = await stripe.prices.list();

        const data = productsData
            .filter(el => el.active)
            .map(el => ({ name: el.name, price: el.default_price }))
            .map(product => ({ ...product, price: pricesData.find(priceData => priceData.id == product.price).unit_amount_decimal, recurring: pricesData.find(priceData => priceData.id == product.price)?.recurring?.interval, priceId: pricesData.find(priceData => priceData.id == product.price).id }))
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

        const price = await stripe.prices.retrieve(body.priceId)

        const session = price.recurring
            ? await stripe.checkout.sessions.create({
                success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento?success=true&session={CHECKOUT_SESSION_ID}`,
                line_items: [
                    {
                        price: body.priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                customer_email: body.customer_email,
            })
            : await stripe.checkout.sessions.create({
                success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento?success=true&session={CHECKOUT_SESSION_ID}`,
                line_items: [
                    {
                        price: body.priceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                customer_email: body.customer_email,
                payment_method_options: {
                    card: {
                        installments: {
                            enabled: true
                        }
                    }
                }
            })


        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,

            auth: {
                user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
                pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
            to: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
            subject: `Pré-matrícula realizada pelo site`,
            html: `
                <p>Cliente: ${body.name} </p>
                <p>E-mail: ${body.customer_email} </p>
                <p>Telefone: ${body.phone} </p>
            `,
        })

        return NextResponse.json({ data: session });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
