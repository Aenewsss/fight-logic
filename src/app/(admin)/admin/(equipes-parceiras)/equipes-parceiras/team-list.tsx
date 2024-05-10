'use client'
import Button from "@/components/button";
import { ITeam } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import TeamAddForm from "./team-add-form";
import { toast } from "react-toastify";
import teamService from "@/services/team.service";

export default function TeamList() {

    const [teams, setTeams] = useState<ITeam[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        getTeams()
    }, [showAddForm]);

    async function getTeams() {
        setLoading(true)
        const { data } = await teamService.getTeams()
        setTeams(data)
        setLoading(false)
    }

    async function removeTeam(id: string, logoUrl: string, teamUrl: string) {
        try {
            await teamService.removeTeam(id, logoUrl, teamUrl)
            toast('Feedback removido com sucesso', { type: "success" });
            getTeams()
        } catch (error) {
            toast('Erro ao remover feedback', { type: "error" });
        }
    }

    if (loading) return <p>Carregando</p>

    if (showAddForm) return <TeamAddForm setShowAddForm={setShowAddForm} />

    return (
        <div className="mt-8 shadow-md shadow-black px-8 py-4 bg-white rounded">
            {teams &&
                <table className="table-auto">
                    <thead className="bg-gray-400 text-white">
                        <tr>
                            <th className="py-2">Equipe</th>
                            <th>Descrição</th>
                            <th>Logo</th>
                            <th>Foto</th>
                            <th>Editar</th>
                            <th className="px-4">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((el, index) =>
                            <tr key={index} className="border-b border-gray-30">
                                <td className="font-medium py-2">{el.name}</td>
                                <td className="pl-8 py-2">{el.text}</td>
                                <td className="pl-8 py-2">
                                    <Image unoptimized src={el.logo} width={100} height={100} alt="Lápis de edição" className="object-cover" />
                                </td>
                                <td className="pl-8 py-2">
                                    <Image unoptimized src={el.image} width={100} height={100} alt="Lápis de edição" className="object-cover" />
                                </td>
                                <td className="pl-4">
                                    <Link href={`/admin/equipes-parceiras/${index}?name=${el.name}&text=${el.text}&image=${el.image}&logo=${el.logo}`} className="group">
                                        <Image src="/icons/pencil.svg" width={20} height={20} alt="Lápis de edição" className="group-hover:scale-110" />
                                    </Link>
                                </td>
                                <td onClick={_ => removeTeam(index.toString(), el.logo, el.image)} className="text-center text-red-500 hover:scale-110 font-semibold cursor-pointer">X</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
            <Button className="mt-4" onClick={_ => setShowAddForm(true)} text="Adicionar Equipe" />
        </div>
    )
}