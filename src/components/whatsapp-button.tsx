'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function WhatsAppButton() {
    const pathname = usePathname()

    const [showContacts, setShowContacts] = useState(false);

    if (!pathname.includes('admin') && !pathname.includes('login') && !pathname.includes('cadastro')) return <>
        {showContacts &&
            <div className="fixed bottom-24 right-5 flex flex-col gap-4 bg-white rounded shadow-md">
                <span onClick={() => setShowContacts(false)} className="absolute -top-1 right-1 cursor-pointer">x</span>
                <div className="bg-green flex gap-4 text-white bg-[#25D366] p-4 items-center">
                    <Image className="shadow-black drop-shadow-xl h-8 w-8" src="/icons/whatsapp.svg" height={16} width={16} alt="Ícone do WhatsApp" />
                    Entrar em contato
                </div>
                <div className="flex flex-col gap-4 p-4 pt-0">
                    <Link target="_blank" className="border-l-4 transition-all hover:scale-105 border-[#25d366] bg-gray-600 bg-opacity-15 p-2 flex gap-2 items-center" href="https://api.whatsapp.com/send?phone=5561993664879&amp;text=Olá, venho através do site e gostaria de saber mais sobre os serviços da Fight Logic.">
                        <Image className="rounded-full bg-black p-2 object-contain shadow-black drop-shadow-xl h-12 w-12" src="/logo-amarela.png" height={40} width={40} alt="Ícone do WhatsApp" />
                        <div className="flex flex-col">
                            Fight Logic 1
                            <span className="text-xs text-gray-500">Enviar mensagem</span>
                        </div>
                    </Link>
                    <Link target="_blank" className="border-l-4 transition-all hover:scale-105 border-[#25d366] bg-gray-600 bg-opacity-15 p-2 flex gap-2 items-center" href="https://api.whatsapp.com/send?phone=5561991256960&amp;text=Olá, venho através do site e gostaria de saber mais sobre os serviços da Fight Logic.">
                        <Image className="rounded-full bg-black p-2 object-contain shadow-black drop-shadow-xl h-12 w-12" src="/logo-branca.png" height={40} width={40} alt="Ícone do WhatsApp" />
                        <div className="flex flex-col">
                            Fight Logic 2
                            <span className="text-xs text-gray-500">Enviar mensagem</span>
                        </div>
                    </Link >
                </div >
            </div >}
        <Image onClick={() => setShowContacts(!showContacts)} className="animate-bounce fixed bottom-5 right-5 transition-all hover:scale-105 shadow-black drop-shadow-xl md:h-auto md:w-auto h-10 w-10 cursor-pointer" src="/icons/whatsapp.svg" height={60} width={60} alt="Ícone do WhatsApp" />
    </>
}