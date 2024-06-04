'use client'

import { IPlan, RecurringEnum } from "@/interfaces";
import paymentService from "@/services/payment.service";
import planService from "@/services/plan.service";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Pix from "./pix";
import Loading from "./loading";

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
            setPlan(data[plan_index])
        }
        getData()
    }, []);

    async function createPaymentSession(installments: number, price: number) {
        setLoading(true);
        try {
            const { data } = await paymentService.createPaymentSession(plan.name, installments, price);
            router.push(data.url);
        } catch (error) {
            setLoading(false);
            console.error("Failed to create payment session:", error);
        }
    }

    function renderPlans() {
        if (!plan || !plan.recurring) return <p>Carregando...</p>

        return (
            <div className="my-8 flex flex-col gap-4">
                <div className="mb-4 text-center">
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                    <p>{plan.text}</p>
                </div>
                <div className="flex flex-wrap gap-10 justify-center">
                    {plan.recurring.map((rec, index) => (
                        <div key={index} className="bg-white shadow-sm scale-110 hover:scale-125 transition-all cursor-pointer shadow-black p-4 w-56 rounded text-center">
                            <h3><span className="font-medium">Recorrência:&nbsp;</span>{rec.type}</h3>
                            <p>R$ {rec.price},00</p>
                            {rec.type !== RecurringEnum.unique && <p>{rec.installments} parcelas</p>}
                            <button onClick={_ => createPaymentSession(rec.installments, rec.price)} className="bg-blue-500 px-3 py-2 rounded mt-4 text-white transition-all hover:scale-105">Pagar com cartão</button>
                        </div>
                    ))}
                    {
                        plan.recurring.find(el => el.type != RecurringEnum.unique)
                            ?
                            <div className="bg-white shadow-sm scale-110 hover:scale-125 transition-all cursor-pointer shadow-black p-4 w-56 rounded text-center">
                                <h3><span className="font-medium">Recorrência:&nbsp;</span>À vista</h3>
                                <p>R$ {plan.recurring.find(el => el.type == RecurringEnum.yearly).price * plan.recurring.find(el => el.type == RecurringEnum.yearly).installments},00</p>
                                <button onClick={_ => setShowPixModal(true)} className="bg-blue-500 px-3 py-2 rounded mt-4 text-white transition-all hover:scale-105">Pagar com PIX</button>
                            </div>
                            :
                            <div className="bg-white shadow-sm scale-110 hover:scale-125 transition-all cursor-pointer shadow-black p-4 w-56 rounded text-center">
                                <h3><span className="font-medium">Recorrência:&nbsp;</span>À vista</h3>
                                <p>R$ {plan.recurring[0].price},00</p>
                                <button onClick={_ => setShowPixModal(true)} className="bg-blue-500 px-3 py-2 rounded mt-4 text-white transition-all hover:scale-105">Pagar com PIX</button>
                            </div>

                    }
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto pt-10 pb-40">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center mb-8 md:leading-[3.5rem]">
                Escolha seu método de pagamento
            </h1>

            {showPixModal && <Pix setShowPixModal={setShowPixModal} />}
            {loading && <Loading />}

            {renderPlans()}
        </main>
    )
}