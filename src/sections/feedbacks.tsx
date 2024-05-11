'use client'
import { IFeedback } from "@/interfaces";
import feedbackService from "@/services/feedback.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([{ image: '', name: '', text: '' }]);

    useEffect(() => {
        async function getData() {
            const { data } = await feedbackService.getFeedbacks()
            setFeedbacks(data)
        }
        getData()
    }, []);

    return (
        <section className="container mx-auto">
            <div className="flex gap-10">

                <div className="min-w-[260px] w-[260px] h-[362px] rounded-xl bg-black relative flex items-center justify-center ml-10">
                    <div className="w-[318px] h-[302px] rounded-xl bg-[#EDEDED] absolute flex flex-col items-center justify-center">
                        <Image className="object-cover" unoptimized src={feedbacks[0].image} width={184} height={196} alt="Foto do aluno" />
                        <h3 className="font-questrial">{feedbacks[0].name}</h3>
                    </div>
                </div>

                <div className="flex flex-col gap-8 w-full items-center">
                    <h2 className="text-[3.5rem] z-10 text-black font-questrial">Feedbacks dos nossos alunos</h2>

                    <div className="relative">
                        <p>{feedbacks[0].text}</p>
                        <Image className="absolute -top-10 -left-[60px]" src="/icons/quote.svg" width={60} height={60} alt="Aspas"/>
                        <Image className="absolute -bottom-10 -right-[60px]" src="/icons/quote-inversa.svg" width={60} height={60} alt="Aspas invertidas"/>
                    </div>

                    <Link href="/matricula" className="bg-black text-white px-8 py-3 font-questrial text-2xl rounded-2xl">Matricular agora</Link>

                </div>
            </div>
        </section>
    )
}