'use client'
import bannerService from "@/services/banner.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Top() {

    const [banner, setBanner] = useState('');

    useEffect(() => {
        async function getData() {
            setBanner(localStorage.getItem('banner-image') || '')

            bannerService.getCurrentBanner().then(({ data }) => {
                localStorage.setItem('banner-image', data)
                setBanner(data)
            })
        }
        getData()
    }, []);

    return (
        <section className="relative z-0 flex justify-center items-center">
            <Image unoptimized className="object-cover w-full h-screen" src={banner} width={300} height={100} alt="Banner" />
            <div className="absolute bg-black opacity-60 w-full h-full"></div>
            <div className="absolute flex flex-col  md:px-auto px-4 gap-4">
                <h1 className=" md:text-6xl text-4xl container md:text-center text-white font-bold font-questrial md:leading-[80px] leading-[50px]">
                    Domine cada movimento.<br />
                    Supere os desafios.<br />
                    Sua jornada começa aqui.
                </h1>
                <Link href="/matricula" className="bg-white flex md:self-center self-start text-black px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </section>
    )
}