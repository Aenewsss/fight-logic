import { RecurringEnum } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { plan_name, installments, price, type } = body

    const stripePrice = type != RecurringEnum.unique
      ? await stripe.prices.create({
        currency: 'brl',
        unit_amount: price * 100,
        recurring: {
          interval: 'month',
        },
        product_data: {
          name: plan_name,
        },
      })
      : await stripe.prices.create({
        currency: 'brl',
        unit_amount: price * 100,
        product_data: {
          name: plan_name,
        },
      })

    console.log(stripePrice)

    return NextResponse.json({ data: stripePrice });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}