'use client'
import Button from "@/components/button"
import { useFormState, useFormStatus } from "react-dom"
import { useEffect, useState } from "react"
import { IPlan } from "@/interfaces"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from 'next/navigation'
import planService from "@/services/plan.service"
import { preMatricula } from "../actions/pre-matricula"

export default function BasicDataForm() {
    const router = useRouter()

    const [state, action] = useFormState(preMatricula, undefined)

    const [plans, setPlans] = useState<IPlan[]>([]);
    const [indexSelected, setIndexSelected] = useState(0);

    useEffect(() => {
        getData()
        async function getData() {
            const { data } = await planService.getPlans()
            setPlans(data)
        }
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Pré-cadastro realizado', { type: "success" });
            console.log('state.data',state.data)
            router.push(state.data.url)
        }
    }, [state]);

    return (
        <form action={action} className="flex flex-col gap-8 md:px-0 px-4 ">
            <div className="flex justify-between gap-8 md:flex-nowrap flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Qual é o seu nome?</label>
                    <input required placeholder="Nome completo" className={`px-4 border rounded py-2 ${plans?.length < 1 && 'animate-pulse  opacity-50 pointer-events-none'}`} id="name" type="text" name="name" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">E-mail</label>
                    <input required placeholder="fightlogic@gmail.com" className={`px-4 border rounded py-2 ${plans?.length < 1 && 'animate-pulse  opacity-50 pointer-events-none'}`} id="email" type="text" name="email" />
                </div>
            </div>
            <div className="flex justify-between gap-4 md:flex-nowrap flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Número de Telefone</label>
                    <input required placeholder="(61) 9 9263 4979" className={`px-4 border rounded py-2 ${plans?.length < 1 && 'animate-pulse  opacity-50 pointer-events-none'}`} id="phone" type="text" name="phone" />
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="title">Escolha seu plano</label>
                <select onChange={e => setIndexSelected(Number(e.target.value))} required className="px-4 border rounded py-2 cursor-pointer" name="modality" id="modality">
                    {plans?.map((el, index) =>
                        <option key={index} value={index}>{el.name}</option>
                    )}
                </select>
                <p>
                    <span className="font-medium">Descrição:&nbsp;</span>
                    <span>{plans[indexSelected]?.text}</span>
                </p>
            </div>
            <div>
                <SubmitButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return <Button className="bg-blue-500" backgroundColor="black" color="white" type='submit' disabled={pending} text={pending ? 'Carregando...' : 'Avançar'} />
}