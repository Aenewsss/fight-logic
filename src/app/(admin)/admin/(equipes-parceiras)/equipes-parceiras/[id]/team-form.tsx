'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from "next/navigation";
import { ITeam } from "@/interfaces";
import { TeamButton } from "../team-button";
import { updateTeam } from "@/app/actions/team";
import Image from "next/image";

interface IProps {
    id: string
}

export default function Form({ id }: IProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [state, action] = useFormState(updateTeam, undefined)
    const [team, setTeam] = useState<ITeam>();
    const [newImage, setNewImage] = useState('');
    const [newLogo, setNewLogo] = useState('');

    useEffect(() => {
        const name = searchParams.get('name')!
        const text = searchParams.get('text')!
        const logo = searchParams.get('logo')!.replace('/teams/', '/teams%2F')
        const image = searchParams.get('image')!.replace('/teams/', '/teams%2F')
        setTeam({ id, name, text, logo, image })
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Equipe alterada com sucesso', { type: "success" });
            setTimeout(() => {
                router.push('/admin/equipes-parceiras')
            }, 2000);
        }
    }, [state]);

    function handleImage(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setNewImage(url)
    }

    function handleLogo(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setNewLogo(url)
    }


    if (!team) return <p>Carregando</p>

    return (
        <form action={action} className="w-full mt-8 bg-white shadow-md shadow-black p-8 flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Equipe</label>
                <input placeholder="Nome do aluno" value={team.name} onChange={e => setTeam({ ...team, name: e.target.value })} className="px-4 border rounded py-2" id="name" type="text" name="name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Descrição</label>
                <textarea value={team.text} onChange={e => setTeam({ ...team, text: e.target.value })} className="px-4 border rounded py-2" id="text" name="text"></textarea>
            </div>
            <div className="flex justify-between gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Logo</label>
                    {team.logo || newLogo
                        ? <Image className="max-h-[500px] object-contain" unoptimized src={newLogo || team.logo} width={300} height={300} alt="Logomarca" />
                        : <p>Carregando</p>
                    }
                    <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-start bg-blue-500 text-white px-3 py-2" htmlFor="logo">
                        Alterar Logo
                    </label>
                    <input onChange={handleLogo} name="logo" id="logo" className="opacity-0" type="file" accept="image/*" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Foto da Equipe</label>
                    {team.image || newImage
                        ? <Image className="max-h-[500px] object-contain" unoptimized src={newImage || team.image} width={300} height={300} alt="Imagem da Equipe" />
                        : <p>Carregando</p>
                    }
                    <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-start bg-blue-500 text-white px-3 py-2" htmlFor="image">
                        Alterar Foto
                    </label>
                    <input onChange={handleImage} name="image" id="image" className="opacity-0" type="file" accept="image/*" />
                </div>
            </div>
            <input name="id" value={id} hidden type="text" />

            <div className="border-t pt-2 flex justify-end w-full">

                <TeamButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}