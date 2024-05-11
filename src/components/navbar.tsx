'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
    const pathname = usePathname()

    const [navClass, setNavClass] = useState<{ marginTop: string, bgColor: string, textColor: string, container:boolean }>(
        { marginTop: ' mt-4', bgColor: 'bg-white', textColor: 'text-black', container: true }
    );

    useEffect(() => {

        function scrollListener() {
            const scrollPos = Math.abs(document.body.getBoundingClientRect().top)

            if (scrollPos > 10) setNavClass({ marginTop: ' mt-0', bgColor: 'bg-black', textColor: 'text-white',container: false})
            else setNavClass({ marginTop: ' mt-4', bgColor: 'bg-white', textColor: 'text-black',container: true })
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, []);

    if (!pathname.includes('admin')) return (
        <nav className={`flex justify-center fixed w-full z-20 ${navClass.marginTop} transition-all `}>
            <div className={`${navClass.container && 'container'} ${!navClass.container && 'w-full'} ${navClass.bgColor} ${navClass.textColor} flex transition-all  justify-around shadow-md ${navClass.marginTop == 'mt-4' && 'shadow-gray-400'} items-center font-questrial`}>
                <ul className="list-none flex gap-4">
                    <li><Link href="/horarios">Nossos horários</Link></li>
                    <li><Link href="/equipes-parceiras">Equipes parceiras</Link></li>
                    <li><Link href="/#diferenciais">Diferenciais Fight Logic</Link></li>
                </ul>
                <Link href="/">
                    <Image src={`${navClass.container ? '/logo-amarela-dark.png' : '/logo-branca.png'}`} width={navClass.container ? 106 : 76} height={38} alt="Logo Fight Logic" />
                </Link>
                <ul className="list-none flex gap-4">
                    <li className="after:bg-amber-400 after:absolute after:w-full after:h-[2px] after:rounded after:drop-shadow-lg  after:-bottom-0 after:left-0 after:shadow-md after:shadow-amber-500 after:animate-pulse relative"><Link href="/matricula">Faça parte do time</Link></li>
                    <li><Link href="/#contato">Entre em contato</Link></li>
                    <li><Link href="/quem-somos">Quem somos</Link></li>
                </ul>
            </div>
        </nav>
    )
}