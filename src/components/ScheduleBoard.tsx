'use client'
import { ISchedule } from "@/interfaces";
import scheduleService from "@/services/schedule.service";
import { ScheduleInitialState } from "@/states";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ScheduleBoard() {

    const [schedule, setSchedule] = useState<ISchedule>(ScheduleInitialState);

    useEffect(() => {
        async function getData() {
            const { data } = await scheduleService.getSchedules()
            setSchedule(data)
        }

        getData()
    }, []);

    return (
        <div className="bg-black py-8 px-16 text-white flex flex-col gap-8">
            <ul className="flex  list-none text-2xl font-questrial">
                <li className="min-w-[140px] text-center">Domingo</li>
                <li className="min-w-[140px] text-center">Segunda</li>
                <li className="min-w-[140px] text-center">Terça</li>
                <li className="min-w-[140px] text-center">Quarta</li>
                <li className="min-w-[140px] text-center">Quinta</li>
                <li className="min-w-[140px] text-center">Sexta</li>
                <li className="min-w-[140px] text-center">Sábado</li>
            </ul>
            <div className="flex min-h-[400px]">
                <ul className="min-w-[140px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.sunday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="min-w-[140px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.monday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="min-w-[140px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.tuesday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="min-w-[140px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.wednesday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="min-w-[140px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.thursday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="min-w-[140px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.friday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="min-w-[140px]">
                    {Object.keys(schedule.saturday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex justify-center">
                <Link href="/matricula" className="bg-white text-black px-8 py-1 font-questrial text-lg rounded-md">Matricular agora</Link>
            </div>
        </div>
    )
}