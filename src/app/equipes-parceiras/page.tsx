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
        <main className="mx-auto md:pt-32 pt-10 pb-20">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center md:px-0 px-4">Equipes Parceiras Fight Logic</h1>

            {
                teams.map((el, index) => (
                    <div key={index} className="relative mt-10">
                        <Image unoptimized className="md:w-2/3 w-full max-h-[400px] object-cover md:rounded-r-xl" src={el.image} width={400} height={300} alt={`Foto do time ${el.name}`} />
                        <div className="md:absolute right-0 -bottom-20 flex items-center justify-center bg-black md:w-1/2 w-full md:h-[300px] p-5 md:rounded-l-xl">
                            <div className="flex gap-4 md:flex-nowrap flex-wrap justify-center">
                                <div className="bg-white flex justify-center items-center rounded-md min-w-[200px]">
                                    <Image unoptimized src={el.logo} width={172} height={172} alt={`Logo ${el.name}`} />
                                </div>
                                <p className="text-white font-inter text-left px-4">{el.text}</p>
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="flex justify-center md:mt-32 mt-10">
                <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </main>
    )
}