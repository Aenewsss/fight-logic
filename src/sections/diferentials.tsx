'use client'

import { IDiferentials } from "@/interfaces";
import diferentialsService from "@/services/diferentials.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Diferentials() {

    const [diferentials, setDiferentials] = useState<IDiferentials[]>();

    useEffect(() => {
        async function getData() {
            const { data } = await diferentialsService.getDiferentials()
            setDiferentials(data)
        }
        getData()
    }, []);

    return (
        <section className="my-8 relative md:px-0 px-4" id="diferenciais">

            <div className="absolute top-0 left-0 w-full flex items-center">
                <h2 className="md:text-[3.5rem] text-4xl z-10 text-white pl-8 font-questrial">Por que escolher <br />a Fight Logic?</h2>
                <Image className="absolute" src="/blob.svg" width={500} height={500} alt="Blob" />
            </div>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 justify-items-center gap-8">
                    <div className="min-h-[200px]"></div>
                    <div className="flex flex-col gap-4 items-center max-w-[400px]">
                        <Image src="/icons/experencia-10.svg" width={102} height={102} alt="Ícone experiência" />
                        <h3 className="text-center font-inter text-2xl font-semibold">{!diferentials ? 'carregando' : diferentials[0].title}</h3>
                        <p className="text-center font-questrial">{!diferentials ? 'carregando' : diferentials[0].description}</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center max-w-[400px]">
                        <Image src="/icons/profissional-qualificado.svg" width={102} height={102} alt="Ícone profissionais qualificados" />
                        <h3 className="text-center font-inter text-2xl font-semibold">{!diferentials ? 'carregando' : diferentials[1].title}</h3>
                        <p className="text-center font-questrial">{!diferentials ? 'carregando' : diferentials[1].description}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 mt-10 justify-items-center gap-8">
                    <div className="flex flex-col gap-4 items-center max-w-[400px]">
                        <Image src="/icons/iniciantes.svg" width={102} height={102} alt="Ícone iniciantes" />
                        <h3 className="text-center font-inter text-2xl font-semibold">{!diferentials ? 'carregando' : diferentials[2].title}</h3>
                        <p className="text-center font-questrial">{!diferentials ? 'carregando' : diferentials[2].description}</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center max-w-[400px]">
                        <Image src="/icons/pedagogico.svg" width={102} height={102} alt="Ícone abordagem pedagógica" />
                        <h3 className="text-center font-inter text-2xl font-semibold">{!diferentials ? 'carregando' : diferentials[3].title}</h3>
                        <p className="text-center font-questrial">{!diferentials ? 'carregando' : diferentials[3].description}</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center max-w-[400px]">
                        <Image src="/icons/criancas-mulheres.svg" width={102} height={102} alt="Ícone crianças e mulheres" />
                        <h3 className="text-center font-inter text-2xl font-semibold">{!diferentials ? 'carregando' : diferentials[4].title}</h3>
                        <p className="text-center font-questrial">{!diferentials ? 'carregando' : diferentials[4].description}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-10 gap-8">
                    <div className="flex flex-col gap-4 items-center max-w-[400px]">
                        <Image src="/icons/familia.svg" width={102} height={102} alt="Ícone família" />
                        <h3 className="text-center font-inter text-2xl font-semibold">{!diferentials ? 'carregando' : diferentials[5].title}</h3>
                        <p className="text-center font-questrial">{!diferentials ? 'carregando' : diferentials[5].description}</p>
                    </div>

                    <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
                </div>
            </div>
        </section>
    )
}