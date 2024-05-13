'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export default function ModalBenefits() {
    const pathname = usePathname()

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('show-modal-benefits') == 'false') setShow(false)
        else setShow(true)
    }, []);

    function removeModal(){
        localStorage.setItem("show-modal-benefits", 'false')
        setShow(false)
    }

    if (!pathname.includes('admin') && !pathname.includes('login') && !pathname.includes('cadastro') && !pathname.includes('matricula') && !pathname.includes('pagamento') && show) return (
        <div className="bg-[#000000DD] fixed top-0 left-0 z-30 w-full h-screen flex flex-col items-center justify-center">
            <div className="relative w-2/3 flex justify-center items-center rounded-md">
                <Image className="absolute -top-[4rem] z-10 drop-shadow-md shadow-amber-400" unoptimized src="/icons/stars.svg" width={300} height={108} alt="Ícone de estrelas" />
                <Image unoptimized className="h-[400px] w-full object-cover rounded-md" src="/membros-fundadores.png" width={300} height={108} alt="Foto de fundo do time" />
                <div className="absolute bg-black opacity-50 w-full h-full"></div>
                <p className="text-white absolute text-xl text-center font-inter">
                    Treine de maneira mais inteligente e economize!<br/>
                    Os membros fundadores receberão um <span className="font-extrabold">desconto vitalício&nbsp;</span>
                    em nossa academia.
                </p>
                <Link onClick={removeModal} href='/#fundador' className="bg-white md:px-2 md:py-3 font-inter rounded-xl absolute bottom-10 text-center z-10 hover:scale-105 transition-all shadow-md shadow-white">
                    Seja um membro fundador
                </Link>
            </div>
        </div>
    )
}