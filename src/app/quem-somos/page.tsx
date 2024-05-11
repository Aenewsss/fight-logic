'use client'

import { IAbout } from "@/interfaces";
import aboutService from "@/services/about.service";
import { AboutInitialState } from "@/states";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {

    const [about, setAbout] = useState<IAbout>(AboutInitialState);

    useEffect(() => {
        async function getData() {
            const { data } = await aboutService.getAbout()
            setAbout(data)
        }
        getData()
    }, []);

    return (
        <main className="container mx-auto pt-32 pb-10">
            <h1 className="text-[3.5rem] font-questrial text-center mb-8">Conheça Nossa História</h1>
            <div className="flex justify-between">
                <Image className="rounded" src={about.image} width={480} height={480} alt="Foto Time Fight Logic" />
                <p className="text-justify font-inter mt-4">{about.text}</p>
            </div>
            <div className="flex justify-center">
                <Link href="/matricula" className="bg-black text-white px-8 py-3 font-questrial text-2xl rounded-2xl">Matricular agora</Link>
            </div>
        </main>
    )
}