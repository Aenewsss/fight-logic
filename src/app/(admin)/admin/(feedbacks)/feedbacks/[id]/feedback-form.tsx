'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from "next/navigation";
import { IFeedback } from "@/interfaces";
import { FeedbackButton } from "../feedback-button";
import { updateFeedback } from "@/app/actions/feedback";
import Image from "next/image";

interface IProps {
    id: string
}

export default function Form({ id }: IProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [state, action] = useFormState(updateFeedback, undefined)
    const [feedback, setFeedback] = useState<IFeedback>();
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        const name = searchParams.get('name')!
        const feedback = searchParams.get('feedback')!
        const image = searchParams.get('image')!.replace('/feedbacks/', '/feedbacks%2F')
        setFeedback({ id, name, text: feedback, image })
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Diferencial alterado com sucesso', { type: "success" });
            setTimeout(() => {
                router.push('/admin/feedbacks')
            }, 2000);
        }
    }, [state]);

    function handleImage(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setNewImage(url)
    }


    if (!feedback) return <p>Carregando</p>

    return (
        <form action={action} className="w-full mt-8 bg-white shadow-md shadow-black p-8 flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Aluno</label>
                <input placeholder="Nome do aluno" value={feedback.name} onChange={e => setFeedback({ ...feedback, name: e.target.value })} className="px-4 border rounded py-2" id="name" type="text" name="name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Descrição</label>
                <textarea value={feedback.text} onChange={e => setFeedback({ ...feedback, text: e.target.value })} className="px-4 border rounded py-2" id="text" name="text"></textarea>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Foto do Aluno</label>
                {feedback.image || newImage
                    ? <Image className="max-h-[500px] object-contain" unoptimized src={newImage || feedback.image} width={300} height={300} alt="Imagem do Aluno" />
                    : <p>Carregando</p>
                }
                <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-start bg-blue-500 text-white px-3 py-2" htmlFor="file">
                    Alterar Foto
                </label>
                <input required onChange={handleImage} name="file" id="file" hidden type="file" accept="image/*" />
            </div>
            <input name="id" value={id} hidden type="text" />

            <div className="border-t pt-2 flex justify-end w-full">

                <FeedbackButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}