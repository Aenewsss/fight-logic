'use client'

import { ICourse } from "@/interfaces";
import competitionService from "@/services/competition.service";
import courseService from "@/services/courses.service";
import { CourseInitialState } from "@/states";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {

    const [courses, setCourses] = useState<ICourse[]>([CourseInitialState]);

    useEffect(() => {
        async function getData() {
            const { data } = await courseService.getCourses()
            setCourses(data)
        }
        getData()
    }, []);

    return (
        <main className="container mx-auto md:pt-36 pt-10 pb-10  md:px-0 px-4 flex flex-col gap-8">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center md:leading-[60px]">Cursos online</h1>

            <div className="flex flex-col gap-8">
                {
                    courses?.map((el, index) =>
                        <div key={index} className="flex flex-col gap-4 my-10 md:flex-nowrap flex-wrap justify-center items-center">
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-2xl">{el.name}</h2>
                                    <p className="md:w-1/2 text-xl">{el.text || 'carregando..'}</p>
                                </div>
                                <Image unoptimized className="object-contain w-full max-h-[200px]" src={el.image} width={300} height={500} alt="foto competição 1" />
                            </div>
                            <div>
                                <Link href={el.link} className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Quero me inscrever</Link>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* <div className="flex justify-center my-8">
                <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div> */}
        </main>
    )
}