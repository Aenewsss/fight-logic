'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from "next/navigation";
import { IPlan, RecurringEnum } from "@/interfaces";
import { updatePlan } from "@/app/actions/plan";
import { PlanButton } from "./plan-button";
import planService from "@/services/plan.service";

interface IProps {
    id: string
}

export default function PlanForm({ id }: IProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [state, action] = useFormState(updatePlan, undefined)
    const [plan, setPlan] = useState<IPlan>();

    useEffect(() => {
        const name = searchParams.get('name')!
        const text = searchParams.get('text')!

        async function getData() {
            const { data } = await planService.getPlanById(id)
            setPlan({ id, name, text, price: data.price,subscriptions: data.subscriptions })
        }
        getData()

    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Plano alterado com sucesso', { type: "success" });
            setTimeout(() => {
                router.push('/admin/planos')
            }, 2000);
        }
    }, [state]);

    if (!plan || !plan.recurring.length) return <p>Carregando</p>

    return (
        <form action={action} className="w-full mt-8 bg-white shadow-md shadow-black p-8 flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Equipe</label>
                <input placeholder="Nome do aluno" value={plan.name} onChange={e => setPlan({ ...plan, name: e.target.value })} className="px-4 border rounded py-2" id="name" type="text" name="name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Descrição</label>
                <textarea value={plan.text} onChange={e => setPlan({ ...plan, text: e.target.value })} className="px-4 border rounded py-2" id="text" name="text"></textarea>
            </div>
            <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Valor à vista</label>
                    <input
                        type="number"
                        name='price'
                        className="px-4 py-2 border rounded placeholder:text-gray-500"
                        placeholder="3000"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full mt-4">
                    <h3 className="font-semibold">Assinatura 1</h3>
                    <div className="flex gap-8">
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Recorrência</label>
                            <input
                                type="number"
                                name='recurring-1'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="Anual, mensal, trimestral"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Valor mensal</label>
                            <input
                                type="number"
                                name='price-1'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="200"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Link de pagamento</label>
                            <input
                                type="number"
                                name='link-1'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="Insira aqui o link do mercado pago"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h3 className="font-semibold">Assinatura 2</h3>
                    <div className="flex gap-8">
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Recorrência</label>
                            <input
                                type="number"
                                name='recurring-2'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="Anual, mensal, trimestral"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Valor mensal</label>
                            <input
                                type="number"
                                name='price-2'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="200"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Link de pagamento</label>
                            <input
                                type="number"
                                name='link-2'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="Insira aqui o link do mercado pago"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h3 className="font-semibold">Assinatura 3</h3>
                    <div className="flex gap-8">
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Recorrência</label>
                            <input
                                type="number"
                                name='recurring-3'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="Anual, mensal, trimestral"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Valor mensal</label>
                            <input
                                type="number"
                                name='price-3'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="200"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="description">Link de pagamento</label>
                            <input
                                type="number"
                                name='link-3'
                                className="px-4 border rounded py-2 placeholder:text-gray-500"
                                placeholder="Insira aqui o link do mercado pago"
                            />
                        </div>
                    </div>
                </div>
            <input name="id" value={id} hidden type="text" />

            <div className="border-t pt-2 flex justify-end w-full">

                <PlanButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}