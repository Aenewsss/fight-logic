'use client'
import Reveal from "@/app/hooks/Reveal";
import { IFeedback } from "@/interfaces";
import feedbackService from "@/services/feedback.service";
import { FeedbacksInitialState } from "@/states";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>(FeedbacksInitialState);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        async function getData() {
            const { data } = await feedbackService.getFeedbacks()
            setFeedbacks([...feedbacks, ...data])
        }
        getData()
    }, []);


    return (
        <section className="container mx-auto my-20">
            <div className="flex gap-10 md:flex-nowrap flex-wrap justify-center md:justify-normal">
                <h2 className="md:text-[3.5rem] text-4xl z-10 text-black font-questrial md:hidden text-center flex">Feedbacks dos nossos alunos</h2>

                <div className="md:min-w-[260px] min-w-[160px] md:w-[260px] md:h-[362px] h-[200px] rounded-xl bg-black relative flex items-center justify-center md:ml-10 md:mt-0 mt-4">
                    <div className="md:w-[318px] md:h-[302px] rounded-xl bg-[#EDEDED] absolute flex flex-col items-center justify-center gap-2 md:pb-0 pb-2">
                        <Image className="object-cover w-[184px] h-[196px] md:rounded-none rounded" unoptimized src={feedbacks[currentIndex].url || feedbacks[currentIndex].image || '/marceu'} width={184} height={196} alt="Foto do aluno" />

                        <h3 className="font-questrial">{feedbacks[currentIndex].name || ''}</h3>
                    </div>
                </div>

                <div className="flex flex-col gap-8 w-full items-center md:mx-auto mx-4">
                    <Reveal animation="to-left">
                        <h2 className="md:text-[3.5rem] text-4xl z-10 text-black font-questrial hidden md:flex">Feedbacks dos nossos alunos</h2>
                    </Reveal>

                    <Reveal animation="opacity">
                        <div className="relative md:mt-10">
                            {
                                feedbacks[currentIndex].image.includes('mp4')
                                    ? <video className="max-h-[400px] object-cover" src={feedbacks[currentIndex].image} controls></video>
                                    : <p className="md:text-start text-center">{feedbacks[currentIndex].text || 'Carregando texto'}</p>
                            }
                            <Image className="hidden md:flex absolute -top-10 -left-[60px]" src="/icons/quote.svg" width={60} height={60} alt="Aspas" />
                            <Image className="hidden md:flex absolute -bottom-10 -right-[60px]" src="/icons/quote-inversa.svg" width={60} height={60} alt="Aspas invertidas" />
                        </div>
                    </Reveal>

                    <Reveal animation="to-right">
                        <div className="flex gap-2">
                            {feedbacks.length > 1 &&
                                feedbacks.map((el, index) =>
                                    index == currentIndex
                                        ? <Image onClick={_ => setCurrentIndex(index)} className="cursor-pointer" src="/icons/circle-selected.svg" width={16} height={16} alt="Ícone círculo selecionado" />
                                        : <Image onClick={_ => setCurrentIndex(index)} className="cursor-pointer" src="/icons/circle-unselected.svg" width={16} height={16} alt="Ícone círculo não selecionado" />
                                )
                            }
                        </div>
                    </Reveal>
                    <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>

                </div>
            </div>
        </section >
    )
}