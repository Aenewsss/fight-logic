'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
export default function Footer() {
    const pathname = usePathname()

    if (!pathname.includes('admin') && !pathname.includes('login') && !pathname.includes('cadastro')) return (
        <footer className="py-8 bg-black flex flex-col gap-10 md:px-0 px-4">
            <div className="flex flex-wrap md:justify-between justify-center container mx-auto gap-4">
                <Image className="object-contain md:order-1 order-2" src="/logo-branca.png" width={106} height={38} alt="Logo branca Fight Logic" />
                <ul className="list-none flex justify-center flex-wrap gap-5 md:order-2 order-1 text-white font-questrial items-center text-sm">
                    <li><Link href="/horarios">Nossos horários</Link></li>
                    <li><Link href="/equipes-parceiras">Equipes parceiras</Link></li>
                    <li><Link href="/#diferenciais">Diferenciais Fight Logic</Link></li>
                    <li><Link href="/#contato">Entre em contato</Link></li>
                    <li><Link href="/quem-somos">Quem somos</Link></li>
                    <li className="bg-white px-2 py-1 text-black rounded-md"><Link href="/matricula">Faça parte do time</Link></li>
                </ul>
            </div>

            <Link className="text-white text-center font-questrial" target="_blank" href="https://www.aenamartinelli.com.br">Copyright © 2024 All rights reserved | Site desenvolvido por <span className="underline">aenamartinelli.com.br</span></Link>
        </footer>
    )
}