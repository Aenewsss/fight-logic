'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    if (!pathname.includes('admin')) return (
        <nav className="flex justify-center fixed w-full z-20">
            <div className="container bg-white mt-8 flex justify-around shadow-md shadow-gray-400 items-center font-questrial">
                <ul className="list-none flex gap-4">
                    <li><Link href="/horarios">Nossos horários</Link></li>
                    <li><Link href="/equipes-parceiras">Equipes parceiras</Link></li>
                    <li><Link href="/diferenciais">Diferenciais Fight Logic</Link></li>
                </ul>
                <Link href="/">
                    <Image src="/logo-amarela-dark.png" width={106} height={38} alt="Logo Fight Logic" />
                </Link>
                <ul className="list-none flex gap-4">
                    <li className="after:bg-amber-400 after:absolute after:w-full after:h-[2px] after:rounded after:drop-shadow-lg  after:-bottom-0 after:left-0 after:shadow-md after:shadow-amber-500 after:animate-pulse relative"><Link href="/matricula">Faça parte do time</Link></li>
                    <li><Link href="/contato">Entre em contato</Link></li>
                    <li><Link href="/quem-somos">Quem somos</Link></li>
                </ul>
            </div>
        </nav>
    )
}