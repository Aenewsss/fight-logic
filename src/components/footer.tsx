import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-8 bg-black flex flex-col gap-10">
            <div className="flex justify-between container mx-auto">
                <Image src="/logo-branca.png" width={106} height={38} alt="Logo branca Fight Logic" />
                <ul className="list-none flex gap-5 text-white font-questrial items-center text-sm">
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