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

        if (body?.object == 'event') {

            const customerId = body.data.object.customer

            const { email, name } = (await stripe.customers.list()).data.find(el => el.id == customerId)

            const mail = await transporter.sendMail({
                from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
                to: email,
                subject: `Matrícula realizada na Fight Logic`,
                html: `
                <p>PARABÉNS POR QUERER FAZER PARTE DESSE TIME!</p>
                <p>Você acabou de realizar a matrícula na seguinte modalidade: ${name}</p>
            `,
            })

            return NextResponse.json({ data: mail, error: null })
        } else {
            const formData = await request.formData()

            const name = formData.get('name')
            const phone = formData.get('phone')
            const email = formData.get('email')
            const message = formData.get('message')

            const mail = await transporter.sendMail({
                from: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
                to: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
                replyTo: email,
                subject: `Novo lead Site Fight Logic`,
                html: `
            <p>Cliente: ${name} </p>
            <p>E-mail: ${email} </p>
            <p>Telefone: ${phone} </p>
            <p>Mensagem: ${message} </p>
            `,
            })
            return NextResponse.json({ data: mail, error: null })
        }

    } catch (error) {
        return NextResponse.json({ data: null, error: error.message })
    }
}