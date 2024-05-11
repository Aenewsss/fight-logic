'use client'

import { ITeam } from "@/interfaces";
import aboutService from "@/services/about.service";
import teamService from "@/services/team.service";
import { TeamInitialState } from "@/states";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {

    const [teams, setTeams] = useState<ITeam[]>([TeamInitialState]);

    useEffect(() => {
        async function getData() {
            const { data } = await teamService.getTeams()
            setTeams(data)
        }
        getData()
    }, []);

    return (
        <main className="mx-auto pt-32 pb-20">
            <h1 className="text-[3.5rem] font-questrial text-center">Equipes Parceiras F1ght Logic</h1>

            {
                teams.map((el, index) => (
                    <div key={index} className="relative mt-10">
                        <Image unoptimized className="w-2/3 max-h-[400px] object-cover rounded-r-xl" src={el.image} width={400} height={300} alt={`Foto do time ${el.name}`} />
                        <div className="absolute right-0 -bottom-20 flex items-center justify-center bg-black w-1/2 h-[300px] p-5 rounded-l-xl">
                            <div className="flex gap-4">
                                <div className="bg-white flex justify-center items-center rounded-md min-w-[200px]">
                                    <Image unoptimized src={el.logo} width={172} height={172} alt={`Logo ${el.name}`} />
                                </div>
                                <p className="text-white font-inter text-justify px-4">{el.text}</p>
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="flex justify-center mt-32">
                <Link href="/matricula" className="bg-black text-white px-8 py-3 font-questrial text-2xl rounded-2xl">Matricular agora</Link>
            </div>
        </main>
    )
}