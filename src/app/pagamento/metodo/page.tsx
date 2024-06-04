'use client'

import { IPlan, RecurringEnum } from "@/interfaces";
import paymentService from "@/services/payment.service";
import planService from "@/services/plan.service";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {

    const searchParams = useSearchParams()

    const router = useRouter()

    const [plan, setPlan] = useState<IPlan>();
    

    useEffect(() => {
        const plan_index = searchParams.get('plan_index')

        async function getData() {
            const { data } = await planService.getPlans()
            setPlan(data[plan_index])
        }
        getData()
    }, []);

    async function createPaymentSession(installments:number, price:number) {
        const { data } = await paymentService.createPaymentSession(plan.name, installments, price)

        router.push(data.url)
    }

    function renderPlans() {
        if (!plan || !plan.recurring) return <p>Carregando...</p>

        return (
            <div className="my-8 flex flex-col gap-4">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                    <p>{plan.text}</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {plan.recurring.map((rec, index) => (
                        <div key={index} className="bg-white shadow-sm scale-110 hover:scale-125 transition-all cursor-pointer shadow-black p-4 w-56 rounded text-center">
                            <h3><span className="font-medium">Recorrência:&nbsp;</span>{rec.type}</h3>
                            <p>R$ {rec.price},00</p>
                            {rec.type !== RecurringEnum.unique && <p>{rec.installments} parcelas</p>}
                            <button onClick={_ => createPaymentSession(rec.installments, rec.price)} className="bg-blue-500 px-3 py-2 rounded mt-4 text-white transition-all hover:scale-105">Selecionar método</button>
                        </div>
                    ))}
                </div>
            </div>
        );

    }

    return (
        <main className="container mx-auto pt-10 pb-40">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center mb-8 md:leading-[3.5rem]">
                Escolha seu método de pagamento
            </h1>

            {renderPlans()}
        </main>
    )
}