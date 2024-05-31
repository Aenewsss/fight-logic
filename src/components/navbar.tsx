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
        { marginTop: 'md:mt-4', bgColor: 'bg-white', textColor: 'text-black', container: true }
    );

    const [showMenu, setShowMenu] = useState(false);
    const [mobileScreen, setMobileScreen] = useState(false);

    useEffect(() => {

        function scrollListener() {
            const scrollPos = Math.abs(document.body.getBoundingClientRect().top)
            if (scrollPos > 10) setNavClass({ marginTop: 'mt-0', bgColor: 'bg-black', textColor: 'text-white', container: false, })
            else setNavClass({ marginTop: 'md:mt-4', bgColor: 'bg-white', textColor: 'text-black', container: true })
        }
        function screenWidthListener() {
            const { innerWidth } = window
            if (innerWidth <= 768) setMobileScreen(true)
            else setMobileScreen(false)
        }

        screenWidthListener()

        window.addEventListener('scroll', scrollListener)
        window.addEventListener('resize', screenWidthListener)


        return () => {
            window.removeEventListener('scroll', scrollListener)
            window.removeEventListener('resize', screenWidthListener)
        }
    }, []);

    if (!pathname.includes('admin') && !pathname.includes('login') && !pathname.includes('cadastro') && !pathname.includes('matricula')) return (
        <nav className={`nav flex justify-center fixed w-full z-20 ${navClass.marginTop} transition-all ${mobileScreen ? showMenu ? 'translate-y-0' : 'translate-y-[-105%] navbar' : 'animation-to-bottom'} `}>
            <div className={`${navClass.container && 'md:container'} w-full ${navClass.bgColor} ${navClass.textColor} flex md:flex-row flex-col transition-all  justify-around shadow-md ${navClass.marginTop == 'mt-4' && 'shadow-gray-400'} md:items-center items-start md:p-0 p-4 font-questrial`}>
                <p onClick={_ => setShowMenu(false)} className="cursor-pointer md:hidden flex text-lg">x</p>
                <ul className="list-none flex md:flex-row flex-col md:gap-10 gap-4 md:order-1 order-2 md:text-center">
                    <li className="hover:scale-105 transition-all"><Link href="/quem-somos">Quem somos</Link></li>
                    <li className="hover:scale-105 transition-all"><Link href="/aulas-particulares">Aula Particular</Link></li>
                    <li className="hover:scale-105 transition-all"><Link href="/horarios">Horários</Link></li>
                </ul>
                <Link href="/" className="md:order-2 order-1">
                    <Image src={`${navClass.container ? '/logo-amarela-dark.png' : '/logo-branca.png'}`} width={navClass.container ? 106 : 76} height={38} alt="Logo Fight Logic" />
                </Link>
                <ul className="list-none flex md:flex-row flex-col md:gap-10 gap-4 order-3 md:mt-0 mt-4 md:text-center">
                    <li className="hover:scale-105 transition-all"><Link href="/equipes-parceiras">Equipes</Link></li>
                    <li className="after:bg-amber-400 hover:scale-105 transition-all after:absolute after:w-full after:h-[2px] after:rounded after:drop-shadow-lg  after:-bottom-0 after:left-0 after:shadow-md after:shadow-amber-500 after:animate-pulse relative"><Link href="/matricula">Faça parte do time</Link></li>
                    <li className="hover:scale-105 transition-all"><Link target="_blank" href="https://api.whatsapp.com/send?phone=5561993664879&amp;text=Olá, venho através do site e tenho interesse em fazer parte do time Fight Logic.">Contato</Link></li>

                    {/* <li className="md:hidden hover:scale-105 transition-all"><Link href="/#diferenciais">Seja um membro fundador</Link></li> */}
                </ul>
            </div>
            {!showMenu && <div className="md:hidden absolute -bottom-16 left-4 animation-to-bottom animation-delay-1">
                <Image onClick={_ => setShowMenu(true)} className="shadow-black drop-shadow-[2px_2px_8px_rgba(0,0,0,1)] cursor-pointer" src={`${navClass.container ? "/icons/menu-white.svg" : "/icons/menu-white.svg"}`} width={30} height={30} alt="Ícone Menu" />
                <div className="bg-yellow-400 rounded-full w-2 h-2 absolute -right-1 top-0 animate-pulse shadow-lg shadow-yellow-400"></div>
            </div>}
        </nav>
    )
}