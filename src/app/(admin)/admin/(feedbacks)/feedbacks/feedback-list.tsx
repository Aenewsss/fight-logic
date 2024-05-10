'use client'
import { insertFeedback } from "@/app/actions/feedback";
import Button from "@/components/button";
import { IFeedback } from "@/interfaces";
import feedbackService from "@/services/feedback.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeedbackAddForm from "./feedback-add-form";
import { toast } from "react-toastify";

export default function FeedbackList() {
    const router = useRouter()

    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        getFeedbacks()
    }, [showAddForm]);

    async function getFeedbacks() {
        setLoading(true)
        const { data } = await feedbackService.getFeedbacks()
        setFeedbacks(data)
        setLoading(false)
    }

    async function removeFeedback(id: string, url: string) {
        try {
            await feedbackService.removeFeedback(id, url)
            toast('Feedback removido com sucesso', { type: "success" });
            getFeedbacks()
        } catch (error) {
            toast('Erro ao remover feedback', { type: "error" });
        }
    }

    function goToPage(path:string){
        router.push(path)
    }

    if (loading) return <p>Carregando</p>

    if (showAddForm) return <FeedbackAddForm setShowAddForm={setShowAddForm} />

    return (
        <div className="mt-8 shadow-md shadow-black px-4 md:px-8 py-4 bg-white rounded">
            {feedbacks && <>
                <p className="md:hidden my-2 text-blue-400">* clique em cada linha para editar</p>

                <table className="table-auto">
                    <thead className="bg-gray-400 text-white">
                        <tr>
                            <th className="py-2">Aluno</th>
                            <th>Feedback</th>
                            <th className="hidden md:flex">Foto</th>
                            <th className="hidden md:flex">Editar</th>
                            <th className="px-4">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((el, index) =>
                            <tr onClick={_ => goToPage(`/admin/feedbacks/${index}?name=${el.name}&feedback=${el.text}&image=${el.image}`)} key={index} className="border-b border-gray-30 md:cursor-default cursor-pointer">
                                <td className="font-medium py-2">{el.name}</td>
                                <td className="md:pl-8 py-2">{el.text}</td>
                                <td className="md:pl-8 py-2 hidden md:flex">
                                    <Image unoptimized src={el.image} width={100} height={100} alt="Lápis de edição" className="object-cover" />
                                </td>
                                <td className="md:pl-4 hidden md:flex">
                                    <Link href={`/admin/feedbacks/${index}?name=${el.name}&feedback=${el.text}&image=${el.image}`} className="group">
                                        <Image src="/icons/pencil.svg" width={20} height={20} alt="Lápis de edição" className="group-hover:scale-110" />
                                    </Link>
                                </td>
                                <td onClick={_ => removeFeedback(index.toString(), el.image)} className="text-center text-red-500 hover:scale-110 font-semibold cursor-pointer">X</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
            }

            <Button className="mt-4" onClick={_ => setShowAddForm(true)} text="Adicionar Feedback" />
        </div>
    )
}