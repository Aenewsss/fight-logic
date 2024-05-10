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

    if (loading) return <p>Carregando</p>

    if (showAddForm) return <FeedbackAddForm setShowAddForm={setShowAddForm} />

    return (
        <div className="mt-8 shadow-md shadow-black px-8 py-4 bg-white rounded">
            <table className="table-auto">
                <thead className="bg-gray-400 text-white">
                    <tr>
                        <th className="py-2">Aluno</th>
                        <th>Feedback</th>
                        <th>Foto</th>
                        <th>Editar</th>
                        <th className="px-4">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((el, index) =>
                        <tr key={index} className="border-b border-gray-30">
                            <td className="font-medium py-2">{el.name}</td>
                            <td className="pl-8 py-2">{el.text}</td>
                            <td className="pl-8 py-2">
                                <Image unoptimized src={el.image} width={100} height={100} alt="Lápis de edição" className="object-cover" />
                            </td>
                            <td className="pl-4">
                                <Link href={`/admin/feedbacks/${index}?name=${el.name}&feedback=${el.text}&image=${el.image}`} className="group">
                                    <Image src="/icons/pencil.svg" width={20} height={20} alt="Lápis de edição" className="group-hover:scale-110" />
                                </Link>
                            </td>
                            <td onClick={_ => removeFeedback(index.toString(), el.image)} className="text-center text-red-500 hover:scale-110 font-semibold cursor-pointer">X</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Button className="mt-4" onClick={_ => setShowAddForm(true)} text="Adicionar Feedback" />
        </div>
    )
}