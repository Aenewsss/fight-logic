'use client'

import competitionService from "@/services/competition.service";
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
        <main className="container mx-auto md:pt-32 pt-10 pb-10  md:px-0 px-4 flex flex-col gap-8">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center">Competições de JIU-JITSU / GRAPPLING / MMA</h1>

            <p className="text-xl">{text || 'carregando..'}</p>

            <div className="flex justify-center my-8">
                <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </main>
    )
}