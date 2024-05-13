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
        <main className="container mx-auto md:pt-32 pt-10 pb-10  md:px-0 px-4">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center mb-8">Conheça Nossa História</h1>
            <div className="flex justify-between flex-wrap md:flex-nowrap">
                <Image className="rounded object-contain" src={about.image} width={480} height={480} alt="Foto Time Fight Logic" />
                <p className="text-justify font-inter mt-4 md:mt-8">{about.text}</p>
            </div>
            <div className="flex justify-center mt-8">
                <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </main>
    )
}