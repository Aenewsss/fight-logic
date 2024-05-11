'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function WhatsAppButton() {
    const pathname = usePathname()

    if (!pathname.includes('admin')) return (
        <Link target="_blank" className="fixed bottom-5 right-5 transition-all hover:scale-105" href="https://api.whatsapp.com/send?phone=5561992634979&amp;text=Olá, venho através do site e gostaria de saber mais sobre os serviços da Fight Logic.">
            <Image className="shadow-black drop-shadow-xl" src="/icons/whatsapp.svg" height={60} width={60} alt="Ícone do WhatsApp"/>
        </Link>
    )
}