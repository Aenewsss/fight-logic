'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function BenefitsCard() {
    const pathname = usePathname()

    const [opened, setOpened] = useState(false);

    if (!pathname.includes('admin')) return (
        <div onClick={_ => setOpened(!opened)} className={`bg-[#ffd600] shadow-lg shadow-[#ffd600] fixed top-[25%] h-[200px] rounded-md transition-all cursor-pointer p-4 z-10 ${opened ? 'w-[260px]' : 'md:w-11 w-6'}`}>
            {opened ?
                <div className="flex flex-col gap-8 justify-center h-full">
                    <h3 className="font-inter font-semibold text-2xl">Garanta seus benefícios</h3>
                    <Link href='/#fundador' className="bg-white px-2 py-3 font-inter rounded-xl relative text-center z-10">
                        Seja um membro fundador
                        <Image className="absolute -top-[8px] -right-[8px]" src="/icons/crown.svg" width={20} height={20} alt="Ícone coroa" />
                    </Link>
                </div>
                : <ul className="list-none font-inter font-semibold text-center text-sm md:ml-0 -ml-1">
                    <li>B</li>
                    <li className="-mt-1">E</li>
                    <li className="-mt-1">N</li>
                    <li className="-mt-1">E</li>
                    <li className="-mt-1">F</li>
                    <li className="-mt-1">Í</li>
                    <li className="-mt-1">C</li>
                    <li className="-mt-1">I</li>
                    <li className="-mt-1">O</li>
                    <li className="-mt-1">S</li>
                </ul>}
            {!opened && <Image className="absolute -top-[8px] -right-[8px]" src="/icons/crown.svg" width={20} height={20} alt="Ícone coroa" />}
            <div className={`h-full ${opened ? 'w-[240px]' : 'md:w-8 w-4'} absolute top-0 flex items-center`}>
                <Image className={`absolute right-0 ${opened && 'rotate-180'}`} src="/icons/arrow-right-card.svg" width={8} height={8} alt="Ícone seta para direita" />
            </div>
        </div>
    )
}