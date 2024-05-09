'use client'
import { IDiferentials } from "@/interfaces";
import diferentialsService from "@/services/diferentials.service"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DiferentialList() {

    const [diferentials, setDiferentials] = useState<IDiferentials[]>([]);

    useEffect(() => {
        getDiferentials()
    }, []);

    async function getDiferentials() {
        const { data } = await diferentialsService.getDiferentials()
        setDiferentials(data)
    }

    if (!diferentials || diferentials.length == 0) return <p>Carregnado</p>

    return (
        <div className="mt-8 shadow-md shadow-black px-8 py-4 bg-white rounded">
            <table className="table-auto">
                <thead className="bg-gray-400 text-white">
                    <tr>
                        <th className="py-2">Título</th>
                        <th>Descrição</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {diferentials.map((el, index) =>
                        <tr key={index} className="border-b border-gray-30">
                            <td className="font-medium py-2">{el.title}</td>
                            <td className="pl-8 py-2">{el.description}</td>
                            <td className="pl-4">
                                <Link href={`/admin/diferenciais/${index}?title=${el.title}&description=${el.description}`} className="group">
                                    <Image src="/icons/pencil.svg" width={20} height={20} alt="Lápis de edição" className="group-hover:scale-110" />
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}