'use client'
import Reveal from "@/app/hooks/Reveal";
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
        <div className="flex flex-col gap-4  w-full">
            <div className="gap-4 bg-black text-white p-4 rounded-md flex flex-col">
                <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Domingo</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.sunday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Segunda</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.monday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Terça</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.tuesday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Quarta</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.wednesday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Quinta</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.thursday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Sexta</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.friday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Sábado</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.saturday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <Reveal animation="to-top">
                <div className="flex justify-center">
                    <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
                </div>
            </Reveal>
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
                    {Object.entries(schedule.sunday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.entries(schedule.monday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.entries(schedule.tuesday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.entries(schedule.wednesday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.entries(schedule.thursday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px] border-r border-[#8A8A8A]">
                    {Object.entries(schedule.friday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:min-w-[140px] md:min-w-[110px] min-w-[60px]">
                    {Object.entries(schedule.saturday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul>
            </div>
            <Reveal animation="to-top">
                <div className="flex justify-center">
                    <Link href="/matricula" className="bg-white text-black px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
                </div>
            </Reveal>
        </div>
    )
}