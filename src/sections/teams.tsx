'use client'
import Reveal from "@/app/hooks/Reveal";
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
        <section className="my-32">
            <Reveal animation="to-top">
                <h2 className="md:text-[3.5rem] text-4xl font-questrial text-center">Equipes Parceiras Fight Logic</h2>
            </Reveal>

            {
                teams.map((el, index) => (
                    <div key={index} className="mt-10 flex md:flex-nowrap flex-wrap shadow-black shadow-md">
                        <Reveal animation="opacity">
                            <Image unoptimized className="md:w-1/2 w-full max-h-[400px] object-cover" src={el.image} width={400} height={300} alt={`Foto do time ${el.name}`} />
                        </Reveal>
                        <div className="md:w-1/2 bg-black flex items-center p-4 md:flex-nowrap flex-wrap justify-center gap-4 md:text-left text-center">
                            <Reveal animation="opacity">
                                <Image className="object-cover bg-white rounded-md" unoptimized src={el.logo} width={172} height={172} alt={`Logo ${el.name}`} />
                            </Reveal>
                            <Reveal animation="opacity">
                                <p className="text-white font-inter px-4">{el.text}</p>
                            </Reveal>
                        </div>
                    </div>
                ))
            }
            <Reveal animation="to-top">
                <div className="flex justify-center mt-8">
                    <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
                </div>
            </Reveal>
        </section>
    )
}