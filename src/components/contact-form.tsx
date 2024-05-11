'use client'
import { ToastContainer } from "react-toastify";
import Button from "./button";
import { useFormStatus } from "react-dom";

export default function ContactForm() {

    return (
        <form action={'action'} className="flex flex-col gap-4 font-inter text-gray-700 h-full justify-between">
            <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <input required placeholder="Nome" className="px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2" id="name" type="text" name="name" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <input required placeholder="Telefone" className="px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2" id="phone" type="text" name="phone" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <input required placeholder="E-mail" className="px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2" id="email" type="text" name="email" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <textarea required placeholder="Mensagem" className="px-4 border-b border-gray-300 focus-visible:outline-none focus-visible:border-black py-2" id="message" name="message"></textarea>
                </div>
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
            <SubmitButton />
        </form>)
}

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return <Button className="px-10 py-2 font-inter" backgroundColor="black" color="white" type='submit' disabled={pending} text={pending ? 'Carregando...' : 'ENVIAR MENSAGEM'} />
}