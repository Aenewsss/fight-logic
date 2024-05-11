'use client'

import { IAbout } from "@/interfaces";
import aboutService from "@/services/about.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {

    const [about, setAbout] = useState<IAbout>();

    useEffect(() => {
        async function getData() {
            const { data } = await aboutService.getAbout()
            setAbout(data)
        }
        getData()
    }, []);

    return (
        <main className="container mx-auto mt-20">
            <h1 className="text-[3.5rem] font-questrial">Conheça Nossa História</h1>
            <div className="d-flex justify-between">
                <Image className="rounded" src={about.image} width={480} height={480} alt="Foto Time Fight Logic" />
                <p className="text-justify font-inter">{about.text}</p>
            </div>
            <Link href="/matricula" className="bg-black text-white px-8 py-3 font-questrial text-2xl rounded-2xl">Matricular agora</Link>
        </main>
    )
}