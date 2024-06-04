import { insertPlan } from "@/app/actions/plan";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import { PlanButton } from "./plan-button";
import { RecurringEnum } from "@/interfaces";

interface IProps {
    setShowAddForm: any
}

export default function PlanAddForm({ setShowAddForm }: IProps) {

    const [state, action] = useFormState(insertPlan, undefined)

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Plano adicionado com sucesso', { type: "success" });
            setTimeout(() => {
                setShowAddForm(false)
            }, 2000);
        }
    }, [state]);

    return (
        <form action={action} className="p-8 bg-white shadow-md shadow-black flex flex-col gap-4 ">
            <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Nome</label>
                    <input required placeholder="Plano" className="px-4 border rounded py-2" id="title" type="text" name="name" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Descrição</label>
                    <textarea required placeholder="Descrição do plano" className="min-w-[300px] px-4 border rounded py-2" id="description" name="text"></textarea>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Recorrência</label>
                    <div className="px-4 border rounded py-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <label className="flex gap-2">
                                    <input defaultChecked type="checkbox" name="recurring" value={RecurringEnum.yearly} />
                                    {RecurringEnum.yearly}
                                </label>
                                <input
                                    type="number"
                                    name='installments-anual'
                                    defaultValue='0'
                                    className="px-2 border rounded py-1 placeholder:text-gray-500"
                                    placeholder="Quantidade de parcelas"
                                />
                                <input
                                    type="number"
                                    name='price-anual'
                                    className="px-2 border rounded py-1 placeholder:text-gray-500"
                                    placeholder="Valor do plano"
                                />
                            </div>
                            <div className="flex gap-4">
                                <label className="flex gap-2">
                                    <input type="checkbox" name="recurring" value={RecurringEnum.monthly} />
                                    {RecurringEnum.monthly}
                                </label>
                                <input
                                    type="number"
                                    name='installments-mensal'
                                    className="px-2 border rounded py-1 placeholder:text-gray-500"
                                    placeholder="Quantidade de parcelas"
                                />
                                <input
                                    type="number"
                                    name='price-mensal'
                                    className="px-2 border rounded py-1 placeholder:text-gray-500"
                                    placeholder="Valor do plano"
                                />
                            </div>
                            <div className="flex gap-4">
                                <label className="flex gap-2">
                                    <input type="checkbox" name="recurring" value={RecurringEnum.quarterly} />
                                    {RecurringEnum.quarterly}
                                </label>
                                <input
                                    type="number"
                                    name='installments-trimestral'
                                    className="px-2 border rounded py-1 placeholder:text-gray-500"
                                    placeholder="Quantidade de parcelas"
                                />
                                <input
                                    type="number"
                                    name='price-trimestral'
                                    className="px-2 border rounded py-1 placeholder:text-gray-500"
                                    placeholder="Valor do plano"
                                />
                            </div>
                            <div className="flex gap-4">
                                <label className="flex gap-2">
                                    <input type="checkbox" name="recurring" value={RecurringEnum.unique} />
                                    {RecurringEnum.unique}
                                </label>
                                <input
                                    type="number"
                                    name='price-unica'
                                    className="px-2 border rounded py-1 placeholder:text-gray-500"
                                    placeholder="Valor do plano"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <PlanButton />
            <button type="button" className="bg-gray-300 py-1" onClick={_ => setShowAddForm(false)}>Cancelar</button>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}