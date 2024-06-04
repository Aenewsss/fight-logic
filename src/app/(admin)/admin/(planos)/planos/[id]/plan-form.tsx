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
            setPlan({ id, name, text, recurring: data.recurring })
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
                <label htmlFor="description">Recorrência</label>
                <div className="px-4 border rounded py-2">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <label className="flex gap-2">
                                <input defaultChecked={plan.recurring.find(el => el.type.includes(RecurringEnum.yearly)) ? true : false} type="checkbox" name="recurring" value={RecurringEnum.yearly} />
                                {RecurringEnum.yearly}
                            </label>
                            <input
                                value={plan.recurring.find(el => el.type == RecurringEnum.yearly)?.installments}
                                type="number"
                                name='installments-anual'
                                defaultValue='0'
                                className="px-2 border rounded py-1 placeholder:text-gray-500"
                                placeholder="Quantidade de parcelas"
                            />
                            <input
                                value={plan.recurring.find(el => el.type == RecurringEnum.yearly)?.price}
                                type="number"
                                name='price-anual'
                                className="px-2 border rounded py-1 placeholder:text-gray-500"
                                placeholder="Valor do plano"
                            />
                        </div>
                        <div className="flex gap-4">
                            <label className="flex gap-2">
                                <input defaultChecked={plan.recurring.find(el => el.type.includes(RecurringEnum.monthly)) ? true : false} type="checkbox" name="recurring" value={RecurringEnum.monthly} />
                                {RecurringEnum.monthly}
                            </label>
                            <input
                                value={plan.recurring.find(el => el.type == RecurringEnum.monthly)?.installments}
                                type="number"
                                name='installments-mensal'
                                className="px-2 border rounded py-1 placeholder:text-gray-500"
                                placeholder="Quantidade de parcelas"
                            />
                            <input
                                value={plan.recurring.find(el => el.type == RecurringEnum.monthly)?.price}
                                type="number"
                                name='price-mensal'
                                className="px-2 border rounded py-1 placeholder:text-gray-500"
                                placeholder="Valor do plano"
                            />
                        </div>
                        <div className="flex gap-4">
                            <label className="flex gap-2">
                                <input defaultChecked={plan.recurring.find(el => el.type.includes(RecurringEnum.quarterly)) ? true : false} type="checkbox" name="recurring" value={RecurringEnum.quarterly} />
                                {RecurringEnum.quarterly}
                            </label>
                            <input
                                value={plan.recurring.find(el => el.type == RecurringEnum.quarterly)?.installments}
                                type="number"
                                name='installments-trimestral'
                                className="px-2 border rounded py-1 placeholder:text-gray-500"
                                placeholder="Quantidade de parcelas"
                            />
                            <input
                                value={plan.recurring.find(el => el.type == RecurringEnum.quarterly)?.price}
                                type="number"
                                name='price-trimestral'
                                className="px-2 border rounded py-1 placeholder:text-gray-500"
                                placeholder="Valor do plano"
                            />
                        </div>
                        <div className="flex gap-4">
                            <label className="flex gap-2">
                                <input defaultChecked={plan.recurring.find(el => el.type.includes(RecurringEnum.unique)) ? true : false} type="checkbox" name="recurring" value={RecurringEnum.unique} />
                                {RecurringEnum.unique}
                            </label>
                            <input
                                value={plan.recurring.find(el => el.type == RecurringEnum.unique)?.price}
                                type="number"
                                name='price-unica'
                                className="px-2 border rounded py-1 placeholder:text-gray-500"
                                placeholder="Valor do plano"
                            />
                        </div>
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