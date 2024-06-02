'use client'

import competitionService from "@/services/competition.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {

    const [text, setText] = useState('');

    useEffect(() => {
        async function getData() {
            setText((await competitionService.getCompetitionText()).data)
        }
        getData()
    }, []);

    return (
        <main className="container mx-auto md:pt-36 pt-10 pb-10  md:px-0 px-4 flex flex-col gap-8">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center">Competições de JIU-JITSU / GRAPPLING / MMA</h1>

            <div className="flex gap-4 my-10 flex-wrap">
                <div className="md:w-1/2 flex flex-col gap-4 flex-wrap">
                    <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp1.jpeg" width={300} height={500} alt="foto competição 1" />
                    <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp2.jpeg" width={300} height={500} alt="foto competição 1" />
                    <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp3.jpeg" width={300} height={500} alt="foto competição 1" />
                    <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp4.jpeg" width={300} height={500} alt="foto competição 1" />
                    <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp5.jpeg" width={300} height={500} alt="foto competição 1" />
                </div>
                <p className="md:w-1/2 text-xl">{text || 'carregando..'}</p>
            </div>

            <div className="flex flex-col gap-4 flex-wrap">
                <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp6.jpeg" width={300} height={500} alt="foto competição 1" />
                <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp7.jpeg" width={300} height={500} alt="foto competição 1" />
                <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp8.jpeg" width={300} height={500} alt="foto competição 1" />
                <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp9.jpeg" width={300} height={500} alt="foto competição 1" />
                <Image unoptimized className="object-cover w-full max-h-[400px]" src="/competicoes/comp10.jpeg" width={300} height={500} alt="foto competição 1" />
            </div>

            <div className="flex justify-center my-8">
                <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </main>
    )
}