'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams, useRouter } from "next/navigation";
import { ICourse } from "@/interfaces";
import { updateCourse } from "@/app/actions/course";
import Image from "next/image";
import { CourseButton } from "./course-button";

interface IProps {
    id: string
}

export default function Form({ id }: IProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [state, action] = useFormState(updateCourse, undefined)
    const [course, setCourse] = useState<ICourse>();
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        const name = searchParams.get('name')!
        const text = searchParams.get('text')!
        const link = searchParams.get('link')!
        const image = searchParams.get('image')!.replace('/course/', '/course%2F')
        setCourse({ id, name, link, text, image })
    }, []);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Curso alterado com sucesso', { type: "success" });
            setTimeout(() => {
                router.push('/admin/cursos')
            }, 2000);
        }
    }, [state]);

    function handleImage(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setNewImage(url)
    }

    if (!course) return <p>Carregando</p>

    return (
        <form action={action} className="w-full mt-8 bg-white shadow-md shadow-black p-8 flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Nome</label>
                <input placeholder="Nome do curso" value={course.name} onChange={e => setCourse({ ...course, name: e.target.value })} className="px-4 border rounded py-2" id="name" type="text" name="name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Descrição</label>
                <textarea value={course.text} onChange={e => setCourse({ ...course, text: e.target.value })} className="px-4 border rounded py-2" id="text" name="text"></textarea>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Link</label>
                <input placeholder="Link do curso" value={course.link} onChange={e => setCourse({ ...course, link: e.target.value })} className="px-4 border rounded py-2" id="link" type="text" name="link" />
            </div>
            <div className="flex justify-between gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Foto do curso</label>
                    {course.image || newImage
                        ? <Image className="max-h-[500px] object-contain" unoptimized src={newImage || course.image} width={300} height={300} alt="Imagem do curso" />
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

                <CourseButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}