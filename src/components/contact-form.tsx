'use client'
import { ToastContainer, toast } from "react-toastify";
import Button from "./button";
import { useFormState, useFormStatus } from "react-dom";
import { contact } from "@/app/actions/contact";
import { useEffect } from "react";

export default function ContactForm() {
    const [state, action] = useFormState(contact, undefined)

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) toast('Mensagem enviada com sucesso', { type: "success" });
    }, [state]);


    return (
        <form action={action} className="flex flex-col gap-4 font-inter text-gray-700 h-full justify-between">
            <div className="flex gap-2 flex-wrap">
                <input required placeholder="Nome" className="w-full px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2 bg-transparent" id="name" type="text" name="name" />
                <input required placeholder="Telefone" className="w-full px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2 bg-transparent" id="phone" type="text" name="phone" />
                <input required placeholder="E-mail" className="w-full px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2 bg-transparent" id="email" type="text" name="email" />
                <textarea required placeholder="Mensagem" className="w-full px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2 bg-transparent" id="message" name="message"></textarea>
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
            <SubmitButton />
        </form>)
}

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return <Button className="px-10 py-2 font-inter" backgroundColor="black" color="white" type='submit' disabled={pending} text={pending ? 'Carregando...' : 'ENVIAR MENSAGEM'} />
}