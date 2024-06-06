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
                    <label htmlFor="description">Valor à vista</label>
                    <input
                        type="number"
                        required
                        name='price'
                        className="px-4 py-2 border rounded "
                        placeholder="3000"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full mt-4">
                    <h3 className="font-semibold">Assinatura 1</h3>
                    <div className="flex gap-8">
                        <div className="flex flex-col w-full">
                            <label>Recorrência</label>
                            <input
                                type="text"
                                name='recurring-1'
                                className="px-4 border rounded py-2 "
                                placeholder="Anual, mensal, trimestral"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Valor mensal</label>
                            <input
                                type="number"
                                name='price-1'
                                className="px-4 border rounded py-2 "
                                placeholder="200"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Link de pagamento</label>
                            <input
                                type="text"
                                name='link-1'
                                className="px-4 border rounded py-2 "
                                placeholder="Insira aqui o link do mercado pago"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h3 className="font-semibold">Assinatura 2</h3>
                    <div className="flex gap-8">
                        <div className="flex flex-col w-full">
                            <label>Recorrência</label>
                            <input
                                type="text"
                                name='recurring-2'
                                className="px-4 border rounded py-2 "
                                placeholder="Anual, mensal, trimestral"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Valor mensal</label>
                            <input
                                type="number"
                                name='price-2'
                                className="px-4 border rounded py-2 "
                                placeholder="200"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Link de pagamento</label>
                            <input
                                type="text"
                                name='link-2'
                                className="px-4 border rounded py-2 "
                                placeholder="Insira aqui o link do mercado pago"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h3 className="font-semibold">Assinatura 3</h3>
                    <div className="flex gap-8">
                        <div className="flex flex-col w-full">
                            <label>Recorrência</label>
                            <input
                                type="text"
                                name='recurring-3'
                                className="px-4 border rounded py-2 "
                                placeholder="Anual, mensal, trimestral"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Valor mensal</label>
                            <input
                                type="number"
                                name='price-3'
                                className="px-4 border rounded py-2 "
                                placeholder="200"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label>Link de pagamento</label>
                            <input
                                type="text"
                                name='link-3'
                                className="px-4 border rounded py-2 "
                                placeholder="Insira aqui o link do mercado pago"
                            />
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