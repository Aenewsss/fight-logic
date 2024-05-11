'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
    const pathname = usePathname()

    const [navClass, setNavClass] = useState<{
        marginTop: string, bgColor: string,
        textColor: string, container: boolean,
    }>(
        { marginTop: 'mt-4', bgColor: 'bg-white', textColor: 'text-black', container: true }
    );

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {

        function scrollListener() {
            const scrollPos = Math.abs(document.body.getBoundingClientRect().top)
            if (scrollPos > 10) setNavClass({ marginTop: 'mt-0', bgColor: 'bg-black', textColor: 'text-white', container: false, })
            else setNavClass({ marginTop: 'mt-4', bgColor: 'bg-white', textColor: 'text-black', container: true })
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, []);

    if (!pathname.includes('admin') && !pathname.includes('login') && !pathname.includes('cadastro')) return (
        <nav className={`flex justify-center fixed w-full z-20 md:${navClass.marginTop} transition-all ${showMenu ? 'translate-y-0' : 'translate-y-[-110%]'} md:translate-y-0`}>
            <div className={`${navClass.container && 'container'} ${!navClass.container && 'w-full'} ${navClass.bgColor} ${navClass.textColor} flex md:flex-row flex-col transition-all  justify-around shadow-md ${navClass.marginTop == 'mt-4' && 'shadow-gray-400'} md:items-center items-start md:p-0 p-4 font-questrial`}>
                <p onClick={_ => setShowMenu(false)} className="cursor-pointer md:hidden flex text-lg">x</p>
                <ul className="list-none flex md:flex-row flex-col gap-4 md:order-1 order-2">
                    <li className="hover:scale-105 transition-all"><Link href="/horarios">Nossos horários</Link></li>
                    <li className="hover:scale-105 transition-all"><Link href="/equipes-parceiras">Equipes parceiras</Link></li>
                    <li className="hover:scale-105 transition-all"><Link href="/#diferenciais">Diferenciais Fight Logic</Link></li>
                </ul>
                <Link href="/" className="md:order-2 order-1">
                    <Image src={`${navClass.container ? '/logo-amarela-dark.png' : '/logo-branca.png'}`} width={navClass.container ? 106 : 76} height={38} alt="Logo Fight Logic" />
                </Link>
                <ul className="list-none flex md:flex-row flex-col gap-4 order-3 md:mt-0 mt-4">
                    <li className="after:bg-amber-400 hover:scale-105 transition-all after:absolute after:w-full after:h-[2px] after:rounded after:drop-shadow-lg  after:-bottom-0 after:left-0 after:shadow-md after:shadow-amber-500 after:animate-pulse relative"><Link href="/matricula">Faça parte do time</Link></li>
                    <li className="hover:scale-105 transition-all"><Link href="/#contato">Entre em contato</Link></li>
                    <li className="hover:scale-105 transition-all"><Link href="/quem-somos">Quem somos</Link></li>
                </ul>
            </div>
            {!showMenu && <div className="md:hidden translate-y-[120%] translate-x-[-50%]">
                <Image onClick={_ => setShowMenu(true)} className="shadow-black drop-shadow-lg cursor-pointer" src={`${navClass.container ? "/icons/menu-white.svg" : "/icons/menu-black.svg"}`} width={30} height={30} alt="Ícone Menu" />
            </div>}
        </nav>
    )
}