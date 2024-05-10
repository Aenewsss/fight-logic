'use client'
import aboutService from "@/services/about.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { AboutButton } from "./about-button";
import { IAbout } from "@/interfaces";
import { aboutAction } from "@/app/actions/about";

export default function AboutForm() {
    const [state, action] = useFormState(aboutAction, undefined)

    const [about, setAbout] = useState<IAbout>({ image: '', text: '' });
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        async function getAbout() {
            try {
                const { data } = await aboutService.getAbout()
                setAbout(data)
            } catch (error) {
                alert(error)
            }
        }
        getAbout()
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) toast('Alterado com sucesso', { type: "success" });
    }, [state]);

    function handleImage(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setNewImage(url)
    }

    return (
        <form action={action} className="w-full mt-4">
            <div className="flex gap-8 flex-wrap">
                <div className="flex flex-col gap-2">
                    {about.image || newImage
                        ? <Image className="object-cover" unoptimized src={newImage || about.image} width={300} height={300} alt="Imagem do Topo do Site" />
                        : <p>Carregando</p>
                    }
                    <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded text-center bg-blue-500 text-white px-3 py-2" htmlFor="file">
                        Alterar Banner
                    </label>
                    <input onChange={handleImage} name="file" id="file" hidden type="file" accept="image/*" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Texto</label>
                    <textarea value={about.text} onChange={e => setAbout({ ...about, text: e.target.value })} required placeholder="Sobre a Fight Logic" rows={10} className="min-w-[300px] px-4 border rounded py-2" id="about" name="text"></textarea>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-300">
                <AboutButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}