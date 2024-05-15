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
        <section className="relative z-0 flex justify-center items-center h-screen">
            <Image unoptimized className="object-cover w-full h-screen" src={banner} width={900} height={1000} alt="Banner" />
            <div className="absolute bg-black opacity-60 w-full h-full"></div>
            <div className="absolute flex flex-col  md:px-auto px-4 gap-4">
                <h1 className="md:text-6xl text-4xl relative container md:text-center text-white font-bold font-questrial md:leading-[80px] leading-[50px]">
                    <p className="animation-to-right animation-delay-2">Domine cada movimento.</p>
                    <p className="animation-to-left animation-delay-3">Supere os desafios.</p>
                    <p className="animation-to-right animation-delay-4">Sua jornada começa aqui.</p>
                </h1>
                <Link href="/matricula" className="animation-to-top animation-delay-5 bg-white flex md:self-center self-start text-black px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </section>
    )
}