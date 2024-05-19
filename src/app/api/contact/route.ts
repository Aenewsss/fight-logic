import { NextRequest, NextResponse } from "next/server"
import * as nodemailer from "nodemailer"
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {
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

        const body = await request.json()


        const { email, name, subscription: subscriptionId } = body.data.object.customer_details

        const subscription = (await stripe.subscriptions.list()).data.find(el => el.id == subscriptionId)
        const { product: productId, id: priceId } = subscription.items.data[0].plan

        const { name: productName } = (await stripe.products.list()).data.find(el => el.id == productId)

        const mail = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
            to: email,
            subject: `Matrícula realizada na Fight Logic`,
            html: `
                <p>${name}, PARABÉNS POR QUERER FAZER PARTE DESSE TIME!</p>
                <p>Você acabou de realizar a matrícula na seguinte modalidade: ${productName}</p>
            `,
        })

        

        return NextResponse.json({ data: mail, error: null })

    } catch (error) {
        return NextResponse.json({ data: null, error: error.message })
    }
}