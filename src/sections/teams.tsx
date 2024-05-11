'use client'
import { ITeam } from "@/interfaces";
import teamService from "@/services/team.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Teams() {

    const [teams, setTeams] = useState<ITeam[]>([{ image: '', logo: '', name: '', text: '' }]);

    useEffect(() => {
        async function getData() {
            const { data } = await teamService.getTeams()
            setTeams(data)
        }
        getData()
    }, []);

    return (
        <section className="my-20">
            <h2 className="md:text-[3.5rem] text-4xl font-questrial text-center">Equipes Parceiras F1ght Logic</h2>

            {
                teams.map((el, index) => (
                    <div key={index} className="relative mt-10">
                        <Image unoptimized className="md:w-2/3 w-full max-h-[400px] object-cover md:rounded-r-xl" src={el.image} width={400} height={300} alt={`Foto do time ${el.name}`} />
                        <div className="md:absolute right-0 -bottom-20 flex items-center justify-center bg-black md:w-1/2 w-full md:h-[300px] p-5 md:rounded-l-xl">
                            <div className="flex gap-4 flex-wrap justify-center">
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
        </section>
    )
}