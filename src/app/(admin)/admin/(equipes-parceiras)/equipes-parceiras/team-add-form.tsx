import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import { TeamButton } from "./team-button";
import { insertTeam } from "@/app/actions/team";

interface IProps {
    setShowAddForm: any
}

export default function TeamAddForm({ setShowAddForm }: IProps) {

    const [state, action] = useFormState(insertTeam, undefined)

    const [image, setImage] = useState('');
    const [logo, setLogo] = useState('');

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Equipe alterada com sucesso', { type: "success" });
            setTimeout(() => {
                setShowAddForm(false)
            }, 2000);
        }
    }, [state]);

    function handleImage(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setImage(url)
    }
    function handleLogo(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setLogo(url)
    }

    return (
        <form action={action} className="p-8 bg-white shadow-md shadow-black flex flex-col gap-4 ">
            <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Equipe</label>
                    <input required placeholder="Nome da equipe" className="px-4 border rounded py-2" id="title" type="text" name="name" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Descrição</label>
                    <textarea required placeholder="Descrição da equipe" className="min-w-[300px] px-4 border rounded py-2" id="description" name="text"></textarea>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Logo</label>
                {image && <Image className="object-cover" unoptimized src={image} width={100} height={100} alt="Logomarca" />}
                <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-start bg-blue-500 text-white px-3 py-2" htmlFor="logo">
                    {image ? 'Alterar Logo' : 'Adicionar Logo'}
                </label>
                <input className="opacity-0" required onChange={handleImage} name="logo" id="logo" type="file" accept="image/*" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Imagem da Equipe</label>
                {logo && <Image className="w-full max-h-[200px] object-cover" unoptimized src={logo} width={300} height={300} alt="Imagem da equipe" />}
                <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-start bg-blue-500 text-white px-3 py-2" htmlFor="image">
                    {logo ? 'Alterar Imagem' : 'Adicionar Imagem'}
                </label>
                <input className="opacity-0" required onChange={handleLogo} name="image" id="image" type="file" accept="image/*" />
            </div>
            <TeamButton />
            <button type="button" className="bg-gray-300 py-1" onClick={_ => setShowAddForm(false)}>Cancelar</button>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}