'use client'
import bannerService from "@/services/banner.service";
import Image from "next/image";
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
            <h1 className="absolute md:text-6xl text-4xl container text-center text-white font-bold font-questrial leading-[80px]">
                Domine cada movimento.<br className="hidden md:flex" />
                Supere os desafios.<br className="hidden md:flex"/>
                Sua jornada começa aqui.
            </h1>
        </section>
    )
}