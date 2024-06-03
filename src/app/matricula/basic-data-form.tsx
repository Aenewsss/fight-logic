'use client'
import Button from "@/components/button"
import { useFormState, useFormStatus } from "react-dom"
import { paymentBasicData } from "../actions/payment"
import { useEffect, useState } from "react"
import paymentService from "@/services/payment.service"
import { IStripeProducts } from "@/interfaces"
import { StripeProductsInitialState } from "@/states"
import { ToastContainer, toast } from "react-toastify"
import { useRouter } from 'next/navigation'

export default function BasicDataForm() {
    const router = useRouter()

    const [state, action] = useFormState(paymentBasicData, undefined)

    const [products, setProducts] = useState<IStripeProducts[]>(StripeProductsInitialState);

    useEffect(() => {
        getData()
        async function getData() {
            const { data } = await paymentService.getProducts()
            setProducts(data)
        }
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Pré-cadastro realizado', { type: "success" });
            router.push(state.data.url)
        }
    }, [state]);


    return (
        <form action={action} className="flex flex-col gap-8 md:px-0 px-4 ">
            <div className="flex justify-between gap-8 md:flex-nowrap flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Qual é o seu nome?</label>
                    <input required placeholder="Nome completo" className={`px-4 border rounded py-2 ${products?.length < 1 && 'animate-pulse  opacity-50 pointer-events-none'}`} id="name" type="text" name="name" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">E-mail</label>
                    <input required placeholder="fightlogic@gmail.com" className={`px-4 border rounded py-2 ${products?.length < 1 && 'animate-pulse  opacity-50 pointer-events-none'}`} id="email" type="text" name="email" />
                </div>
            </div>
            <div className="flex justify-between gap-4 md:flex-nowrap flex-wrap">

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Número de Telefone</label>
                    <input required placeholder="(61) 9 9263 4979" className={`px-4 border rounded py-2 ${products?.length < 1 && 'animate-pulse  opacity-50 pointer-events-none'}`} id="phone" type="text" name="phone" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Você quer se matricular em qual modalidade?</label>
                    <select required className="px-4 border rounded py-2 cursor-pointer" name="modality" id="modality">
                        {products?.map((el, index) =>
                            <option key={index} value={el.priceId}>{el.name} - R${el.monthly}</option>
                        )}
                    </select>
                </div>
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