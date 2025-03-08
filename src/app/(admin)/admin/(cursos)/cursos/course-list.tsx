'use client'
import Button from "@/components/button";
import { ICourse } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CourseAddForm from "./course-add-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import courseService from "@/services/courses.service";

export default function CourseList() {
    const router = useRouter()

    const [courses, setCourses] = useState<ICourse[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        getCourses()
    }, [showAddForm]);

    async function getCourses() {
        setLoading(true)
        const { data } = await courseService.getCourses()
        setCourses(data)
        setLoading(false)
    }

    async function removeCourse(id: string, courseUrl: string) {
        try {
            await courseService.removeCourse(id, courseUrl)
            toast('curso removido com sucesso', { type: "success" });
            getCourses()
        } catch (error) {
            toast('Erro ao remover curso', { type: "error" });
        }
    }

    function goToPage(path: string) {
        router.push(path)
    }

    if (loading) return <p>Carregando</p>

    if (showAddForm) return <CourseAddForm setShowAddForm={setShowAddForm} />

    return (
        <div className="mt-8 shadow-md shadow-black px-4 md:px-8 py-4 bg-white rounded">
            {courses &&
                <>
                    <p className="md:hidden my-2 text-blue-400">* clique em cada linha para editar</p>
                    <table className="table-auto">
                        <thead className="bg-gray-400 text-white">
                            <tr>
                                <th className="py-2">Nome</th>
                                <th>Descrição</th>
                                <th>Link</th>
                                <th className="hidden md:table-cell">Foto</th>
                                <th className="hidden md:table-cell">Editar</th>
                                <th className="px-4">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((el, index) => {
                                index++
                                return <tr onClick={_ => goToPage(`/admin/cursos/${index}?name=${el.name}&text=${el.text}&image=${el.image}&link=${el.link}`)} key={index} className="border-b border-gray-30 md:cursor-default cursor-pointer">
                                    <td className="font-medium py-2">{el.name}</td>
                                    <td className="pl-2 md:pl-8 py-2">{el.text}</td>
                                    <td className="pl-2 md:pl-8 py-2">{el.link}</td>
                                    <td className="md:pl-8 py-2 hidden md:table-cell">
                                        <Image unoptimized src={el.image} width={100} height={100} alt="Imagem do curso" className="object-cover" />
                                    </td>
                                    <td className="md:pl-4 hidden md:table-cell">
                                        <Link href={`/admin/cursos/${index}?name=${el.name}&text=${el.text}&image=${el.image}&link=${el.link}`} className="group">
                                            <Image src="/icons/pencil.svg" width={20} height={20} alt="Lápis de edição" className="group-hover:scale-110" />
                                        </Link>
                                    </td>
                                    <td onClick={_ => removeCourse(index.toString(), el.image)} className="text-center text-red-500 hover:scale-110 font-semibold cursor-pointer">X</td>
                                </tr>
                            }
                            )}
                        </tbody>
                    </table>
                </>
            }
            <Button className="mt-4" onClick={_ => setShowAddForm(true)} text="Adicionar curso" />
        </div>
    )
}