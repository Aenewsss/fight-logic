import { insertFeedback } from "@/app/actions/feedback";
import { IFeedback } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import { FeedbackButton } from "./feedback-button";

interface IProps {
    setShowAddForm: any
}

export default function FeedbackAddForm({ setShowAddForm }: IProps) {

    const [state, action] = useFormState(insertFeedback, undefined)

    const [image, setImage] = useState('');

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Diferencial alterado com sucesso', { type: "success" });
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

    return (
        <form action={action} className="p-8 bg-white shadow-md shadow-black flex flex-col gap-4 ">
            <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Aluno</label>
                    <input required placeholder="Nome do aluno" className="px-4 border rounded py-2" id="title" type="text" name="name" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Feedback</label>
                    <textarea required placeholder="Mensagem do aluno" className="min-w-[300px] px-4 border rounded py-2" id="description" name="text"></textarea>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Imagem do Aluno</label>
                {image && <Image className="w-full max-h-[500px] object-cover" unoptimized src={image} width={300} height={300} alt="Imagem do Aluno" />}
                <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-start bg-blue-500 text-white px-3 py-2" htmlFor="file">
                    {image ? 'Alterar Foto' : 'Adicionar Foto'}
                </label>
                <input className="opacity-0" required onChange={handleImage} name="file" id="file" type="file" accept="image/*" />
            </div>
            <FeedbackButton />
            <button type="button" className="bg-gray-300 py-1" onClick={_ => setShowAddForm(false)}>Cancelar</button>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}