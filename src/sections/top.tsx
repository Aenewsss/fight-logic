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
        <section>
            <Image unoptimized className="h-screen w-full object-cover" src={banner} width={300} height={100} alt="Banner" />
        </section>
    )
}