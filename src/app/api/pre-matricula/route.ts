import { NextRequest, NextResponse } from "next/server";
import * as nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
    try {
        const form = await request.formData()

        const name = form.get('name')
        const customer_email = form.get('email')
        const phone = form.get('phone')
        const plan = form.get('plan')
        const modality = form.get('modality')

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
                <p>Cliente: ${name} </p>
                <p>E-mail: ${customer_email} </p>
                <p>Telefone: ${phone} </p>
                <p>Plano escolhido: ${plan} </p>
            `,
        })

        const data = {
            url: `/pagamento/metodo?plan_name=${plan}&plan_index=${modality}`,
        }

        return NextResponse.json({ data, error: null });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}