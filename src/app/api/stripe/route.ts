import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN });

// export async function GET(request: NextRequest) {
//     try {
//         const { data: productsData } = await stripe.products.list();

//         const { data: pricesData } = await stripe.prices.list();

//         const data = productsData
//             .filter(el => el.active)
//             .map(el => ({ name: el.name, price: el.default_price }))
//             .map(product => ({ ...product, price: pricesData.find(priceData => priceData.id == product.price).unit_amount_decimal, recurring: pricesData.find(priceData => priceData.id == product.price)?.recurring?.interval, priceId: pricesData.find(priceData => priceData.id == product.price).id }))
//             .map(product => (
//                 {
//                     ...product,
//                     price: product.price.slice(0, product.price.length - 2),
//                     monthly: product.recurring == 'year'
//                         ? Number(product.price.slice(0, product.price.length - 2)) / 12
//                         : Number(product.price.slice(0, product.price.length - 2)),
//                     totalYear: product.recurring == 'year'
//                         ? Number(product.price.slice(0, product.price.length - 2))
//                         : Number(product.price.slice(0, product.price.length - 2)) * 12
//                 }))

//         return NextResponse.json({ data });
//     } catch (err) {
//         return NextResponse.json({ error: err.message });
//     }
// }

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        console.log(body)
        const preference = new Preference(client);

        const pref = await preference.create({
            body: {
                items: [
                    {
                        id: '1',
                        title: body.plan_name,
                        quantity: 1,
                        unit_price: Number(body.price)
                    },
                ],
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento?success=true`
                },
            }
        })

        console.log(pref)

        return NextResponse.json({ data: { url: pref.sandbox_init_point } });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
