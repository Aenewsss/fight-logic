'use client'

import { IPlan, RecurringEnum } from "@/interfaces";
import paymentService from "@/services/payment.service";
import planService from "@/services/plan.service";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Pix from "./pix";
import Loading from "./loading";
import Link from "next/link";

export default function Page() {

    const searchParams = useSearchParams()

    const router = useRouter()

    const [plan, setPlan] = useState<IPlan>();
    const [showPixModal, setShowPixModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const plan_index = searchParams.get('plan_index')

        async function getData() {
            const { data } = await planService.getPlans()
            console.log(data)
            setPlan(data[plan_index])
        }
        getData()
    }, []);

    async function createPaymentSession(price: string) {
        setLoading(true);
        try {
            const { data } = await paymentService.createPaymentSession(plan.name, price);
            router.push(data.url);
        } catch (error) {
            setLoading(false);
            console.error("Failed to create payment session:", error);
        }
    }

    function renderPlans() {
        if (!plan || !plan.subscriptions) return <p>Carregando...</p>


        return (
            <div className="my-28 flex flex-col gap-12">
                <h3 className="text-2xl text-center mb-0">Escolha seu plano por assinatura sem comprometer o limite do seu cartão</h3>
                <div className="flex flex-wrap gap-16 justify-center">
                    {plan.subscriptions.map((subs, index) => (
                        <div key={index} className="flex flex-col justify-between gap-4 bg-white border shadow-sm scale-110 hover:scale-125 transition-all cursor-pointer shadow-black p-4 w-64 max-h-[300px] rounded text-center">
                            <h3 className="capitalize font-semibold text-xl">{subs.recurring}</h3>
                            <p>R$ {subs.price},00</p>
                            <p className="text-sm">Nossas assinaturas nao comprometem o limite do seu cartão</p>
                            <Link href={subs.link} className="bg-blue-500 px-3 py-2 rounded mt-4 text-white transition-all hover:scale-105">Selecionar Plano</Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto pt-10 pb-40 flex flex-col items-center">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial mb-2 md:leading-[3.5rem]"><span className="font-bold capitalize">Plano:&nbsp;</span>{plan?.name}</h1>
            {/* <p className="text-xl">*Escolha seu método de pagamento</p> */}

            {/* <div className="text-white flex flex-col justify-between gap-4 bg-black border shadow-xl scale-110 hover:scale-125 transition-all cursor-pointer shadow-green-500 p-16 max-h-[400px] rounded text-center mt-20">
                <h3 className="font-semibold text-4xl">Pagar com PIX, cartão ou boleto</h3>
                <p>R$ {plan?.price},00</p>
                <p className="text-lg">Essa é nossa forma de pagamento que mais vale a pena</p>
                <button onClick={_ => createPaymentSession(plan.price)} className="bg-green-500 px-3 py-2 rounded mt-4 text-black uppercase tracking-widest font-semibold  transition-all hover:scale-105">Selecionar</button>
            </div> */}

            {loading && <Loading />}

            {renderPlans()}
        </main>
    )
}