'use client'
import Button from "@/components/button"
import { useFormState, useFormStatus } from "react-dom"
import { paymentBasicData } from "../actions/payment"

export default function BasicDataForm() {
    const [state, action] = useFormState(paymentBasicData, undefined)

    return (
        <form action={action} className="flex flex-col gap-8 md:px-0 px-4 ">
            <div className="flex justify-between gap-8 md:flex-nowrap flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Qual é o seu nome?</label>
                    <input required placeholder="Nome completo" className="px-4 border rounded py-2" id="name" type="text" name="name" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">E-mail</label>
                    <input required placeholder="fightlogic@gmail.com" className="px-4 border rounded py-2" id="email" type="text" name="email" />
                </div>
            </div>
            <div className="flex justify-between gap-4 md:flex-nowrap flex-wrap">

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Número de Telefone</label>
                    <input required placeholder="(61) 9 9263 4979" className="px-4 border rounded py-2" id="phone" type="text" name="phone" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Você quer se matricular em qual modalidade?</label>
                    <select required className="px-4 border rounded py-2 cursor-pointer" name="modality" id="modality">
                        <option value="">Jiu Jitsu</option>
                        <option value="">Judô</option>
                        <option value="">Capoeira</option>
                    </select>
                </div>
            </div>

            <div>
                <SubmitButton />
            </div>
        </form>
    )
}

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return <Button className="bg-blue-500" backgroundColor="black" color="white" type='submit' disabled={pending} text={pending ? 'Carregando...' : 'Avançar'} />
}