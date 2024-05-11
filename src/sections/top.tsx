'use client'
import bannerService from "@/services/banner.service";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Top() {

    const [banner, setBanner] = useState('');

    useEffect(() => {
        async function getData() {
            const { data } = await bannerService.getCurrentBanner()
            setBanner(data)
        }
        getData()
    }, []);

    return (
        <section className="relative z-0">
            <Image unoptimized className="object-cover w-full h-screen" src={banner} width={300} height={100} alt="Banner" />
        </section>
    )
}