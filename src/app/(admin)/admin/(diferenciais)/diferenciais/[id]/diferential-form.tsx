'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { DiferentialButton } from "./diferential-button";
import { useSearchParams, useRouter } from "next/navigation";
import { IDiferentials } from "@/interfaces";
import { diferentials } from "@/app/actions/diferentials";

interface IProps {
    id: string
}

export default function Form({ id }: IProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [state, action] = useFormState(diferentials, undefined)
    const [diferential, setDiferential] = useState<IDiferentials>();

    useEffect(() => {
        const title = searchParams.get('title')!
        const description = searchParams.get('description')!
        setDiferential({ id, title, description })
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Diferencial alterado com sucesso', { type: "success" });
            setTimeout(() => {
                router.push('/admin/diferenciais')
            }, 2000);
        }
    }, [state]);

    if (!diferential) return <p>Carregando</p>

    return (
        <form action={action} className="w-full mt-8 bg-white shadow-md shadow-black p-8 flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="title">Título</label>
                <input value={diferential.title} onChange={e => setDiferential({ ...diferential, title: e.target.value })} className="px-4 border rounded py-2" id="title" type="text" name="title" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Descrição</label>
                <textarea rows={10} value={diferential.description} onChange={e => setDiferential({ ...diferential, description: e.target.value })} className="px-4 border rounded py-2" id="description" name="description"></textarea>
            </div>
            <input name="id" value={id} hidden type="text" />
            <DiferentialButton />
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}