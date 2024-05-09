'use client'
import { banner } from "@/app/actions/banner";
import bannerService from "@/services/banner.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { BannerButton } from "./banner-button";
import { ToastContainer, toast } from 'react-toastify';

export default function BannerForm() {
    const [state, action] = useFormState(banner, undefined)

    const [bannerImage, setBannerImage] = useState<string>('');
    const [newBannerImage, setNewBannerImage] = useState('');

    useEffect(() => {
        async function getBanner() {
            try {
                const { data } = await bannerService.getCurrentBanner()
                setBannerImage(data)
            } catch (error) {
                alert(error)
            }
        }
        getBanner()
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) toast('Imagem alterada com sucesso', { type: "success" });
    }, [state]);

    function handleBannerImage(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setNewBannerImage(url)
    }

    return (
        <form action={action} className="w-full mt-4">
            <div className="flex flex-col gap-2">
                {bannerImage || newBannerImage
                    ? <Image className="w-full max-h-[500px] object-cover" unoptimized src={newBannerImage || bannerImage} width={300} height={300} alt="Imagem do Topo do Site" />
                    : <p>Carregando</p>
                }
                <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-center bg-blue-500 text-white px-3 py-2" htmlFor="file">
                    Alterar Banner
                </label>
                <input required onChange={handleBannerImage} name="file" id="file" hidden type="file" />
                <div className={`flex self-center ${newBannerImage ? 'pointer-events-auto' : 'pointer-events-none opacity-60'}`}>
                    <BannerButton />
                </div>
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}