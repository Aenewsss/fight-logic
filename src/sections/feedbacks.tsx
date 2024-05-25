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
            if (data) setFeedbacks([...feedbacks, ...data])
        }
        getData()
    }, []);

    function prevFeedback() {
        if (currentIndex - 1 < 0) setCurrentIndex(feedbacks.length - 1)
        else setCurrentIndex(currentIndex - 1)
    }

    function nextFeedback() {
        if (currentIndex + 1 > feedbacks.length - 1) setCurrentIndex(0)
        else setCurrentIndex(currentIndex + 1)
    }

    return (
        <section className="container mx-auto my-20">
            <Reveal animation="to-top">
                <h2 className="md:text-[3.5rem] text-4xl z-10 text-black font-questrial text-center p-5 leading-[3.5rem]">Feedbacks dos<br />nossos alunos</h2>
            </Reveal>
            <div className="flex md:flex-nowrap flex-wrap gap-10 justify-center mt-10 relative items-center">
                <p onClick={prevFeedback} className="text-7xl fw-bold absolute cursor-pointer transition-all hover:text-6xl left-10 scale-[-1]">❯</p>
                <p onClick={nextFeedback} className="text-7xl fw-bold absolute cursor-pointer transition-all hover:text-6xl right-10">❯</p>

                <div className="md:w-[318px] md:h-[302px] rounded-xl bg-[#EDEDED]  flex flex-col items-center justify-center gap-2 md:pb-0 pb-2">
                    {
                        feedbacks[currentIndex].image.includes('mp4')
                            ? <video className="object-cover w-[184px] h-[196px] md:rounded-none rounded" src={feedbacks[currentIndex].image} controls></video>
                            : <Image className="object-cover w-[184px] h-[196px] md:rounded-none rounded" unoptimized src={feedbacks[currentIndex].url || feedbacks[currentIndex].image || '/marceu'} width={184} height={196} alt="Foto do aluno" />
                    }

                    <h3 className="font-questrial">{feedbacks[currentIndex].name || ''}</h3>
                </div>

                <div className="flex flex-col gap-8 items-center mx-4 justify-between">
                    <Reveal animation="opacity">
                        <div className="relative md:mt-10">

                            <p className="md:text-start text-center">{feedbacks[currentIndex].image.includes('mp4') ? 'Assista o vídeo de feedback' : feedbacks[currentIndex].text}</p>

                            <Image className="hidden md:flex absolute -top-10 -left-[40px]" src="/icons/quote.svg" width={40} height={40} alt="Aspas" />
                            <Image className="hidden md:flex absolute -bottom-10 -right-[40px]" src="/icons/quote-inversa.svg" width={40} height={40} alt="Aspas invertidas" />
                        </div>
                    </Reveal>

                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Link href="/matricula" className="bg-black  text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </section >
    )
}