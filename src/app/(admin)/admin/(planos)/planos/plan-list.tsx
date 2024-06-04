'use client'
import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PlanAddForm from "./plan-add-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IPlan } from "@/interfaces";
import planService from "@/services/plan.service";

export default function PlanList() {
    const router = useRouter()

    const [plans, setPlans] = useState<IPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        getPlans()
    }, [showAddForm]);

    async function getPlans() {
        setLoading(true)
        const { data } = await planService.getPlans()
        setPlans(data)
        setLoading(false)
    }

    async function removePlan(id: string) {
        try {
            await planService.removePlan(id)
            toast('plano removido com sucesso', { type: "success" });
            getPlans()
        } catch (error) {
            toast('Erro ao remover plano', { type: "error" });
        }
    }

    function goToPage(path:string){
        router.push(path)
    }

    if (loading) return <p>Carregando</p>

    if (showAddForm) return <PlanAddForm setShowAddForm={setShowAddForm} />

    return (
        <div className="mt-8 shadow-md shadow-black px-4 md:px-8 py-4 bg-white rounded">
            {plans &&
                <>
                    <p className="md:hidden my-2 text-blue-400">* clique em cada linha para editar</p>
                    <table className="table-auto">
                        <thead className="bg-gray-400 text-white">
                            <tr>
                                <th className="py-2">Nome</th>
                                <th>Descrição</th>
                                <th>Recorrência</th>
                                <th className="hidden md:flex">Editar</th>
                                <th className="px-4">Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.map((el, index) =>
                                <tr onClick={_ => goToPage(`/admin/planos/${index}?name=${el.name}&text=${el.text}`)} key={index} className="border-b border-gray-30 md:cursor-default cursor-pointer">
                                    <td className="font-medium py-2">{el.name}</td>
                                    <td className="pl-2 py-2">{el.text}</td>
                                    {el.recurring && <td className="pl-2 py-2 flex flex-col">{Object.values(el.recurring).map((el, index) => <span key={index}>-{el.type}</span>)}</td>}
                                    <td className="md:pl-4 hidden md:table-cell items-center">
                                        <Link href={`/admin/planos/${index}?name=${el.name}&text=${el.text}`} className="group mt-2">
                                            <Image src="/icons/pencil.svg" width={20} height={20} alt="Lápis de edição" className="group-hover:scale-110" />
                                        </Link>
                                    </td>
                                    <td onClick={_ => removePlan(index.toString())} className="text-center text-red-500 hover:scale-110 font-semibold cursor-pointer">X</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            }
            <Button className="mt-4" onClick={_ => setShowAddForm(true)} text="Adicionar plano" />
        </div>
    )
}