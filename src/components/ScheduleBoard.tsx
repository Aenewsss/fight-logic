'use client'
import { ISchedule } from "@/interfaces";
import scheduleService from "@/services/schedule.service";
import { ScheduleInitialState } from "@/states";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ScheduleBoard() {

    const [schedule, setSchedule] = useState<ISchedule>(ScheduleInitialState);
    const [mobileScreen, setMobileScreen] = useState(false);

    useEffect(() => {
        async function getData() {
            const { data } = await scheduleService.getSchedules()
            setSchedule(data)
        }

        getData()

        function screenWidthListener() {
            const { innerWidth } = window
            if (innerWidth <= 768) setMobileScreen(true)
            else setMobileScreen(false)
        }

        screenWidthListener()
        
        window.addEventListener('resize', screenWidthListener)

        return () => {
            window.removeEventListener('resize', screenWidthListener)
        }
    }, []);


    if (mobileScreen) return (
        <div className="gap-4 bg-black text-white w-full p-4">
            <div className="flex flex-col gap-2">
                <h4>Domingo</h4>
                <ul className="md:min-w-[140px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.sunday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h4>Segunda</h4>
                <ul className="md:min-w-[140px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.monday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h4>Terça</h4>
                <ul className="md:min-w-[140px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.tuesday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h4>Quarta</h4>
                <ul className="md:min-w-[140px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.wednesday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h4>Quinta</h4>
                <ul className="md:min-w-[140px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.thursday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h4>Sexta</h4>
                <ul className="md:min-w-[140px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.friday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h4>Sábado</h4>
                <ul className="md:min-w-[140px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.saturday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
        </div>
    )
    else return (
        <div className="bg-black py-8 lg:px-16 text-white flex flex-col gap-8 mb-10 items-center" style={{ boxShadow: '-2px -2px 10px 0 rgb(0,0,0), 2px 2px 10px 0 rgb(0,0,0)' }}>
            <ul className="flex  list-none text-2xl font-questrial">
                <li className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] text-center">Domingo</li>
                <li className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] text-center">Segunda</li>
                <li className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] text-center">Terça</li>
                <li className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] text-center">Quarta</li>
                <li className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] text-center">Quinta</li>
                <li className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] text-center">Sexta</li>
                <li className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] text-center">Sábado</li>
            </ul>
            <div className="flex min-h-[400px]">
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A] font-inter">
                    {Object.keys(schedule.sunday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.monday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.tuesday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.wednesday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.thursday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.keys(schedule.friday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px]">
                    {Object.keys(schedule.saturday).map((el, index) => <li className="text-center" key={index}>{el}h</li>)}
                </ul>
            </div>
            <div className="flex justify-center">
                <Link href="/matricula" className="bg-white text-black px-8 py-1 font-questrial text-lg rounded-md">Matricular agora</Link>
            </div>
        </div>
    )
}