'use client'
import { UNITS } from "@/app/(admin)/admin/horarios/schedule-board";
import Reveal from "@/app/hooks/Reveal";
import { ISchedule } from "@/interfaces";
import scheduleService from "@/services/schedule.service";
import { ScheduleInitialState } from "@/states";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ScheduleBoard() {

    const [schedule, setSchedule] = useState<ISchedule>(ScheduleInitialState);
    const [mobileScreen, setMobileScreen] = useState(false);
    const [currentUnit, setCurrentUnit] = useState("lago-sul");

    useEffect(() => {
        async function getData() {
            const { data } = await scheduleService.getSchedules(currentUnit)
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
    }, [, currentUnit]);

    if (!schedule) return <p>Grade horária indisponível</p>

    if (mobileScreen) return (
        <div className="flex flex-col gap-4  w-full">
            <div className="flex gap-4 mb-6">
                {UNITS.map((unit) => (
                    <button
                        key={unit}
                        className={`px-4 py-2 rounded ${currentUnit === unit ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setCurrentUnit(unit)}
                    >
                        {unit === 'lago-sul' ? 'Lago Sul' : 'Asa Norte'}
                    </button>
                ))}
            </div>

            <div className="gap-4 bg-white text-white p-4 rounded-md flex flex-col">
                {/* <div className="flex flex-col gap-2">
                    <h4 className="border-b border-gray-700 pb-2">Domingo</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] font-inter">
                        {Object.entries(schedule.sunday).map((el: any, index) =>
                            <li className="text-center" key={index}>
                                <Link href="/matricula">{el[1]} - {el[0]}h</Link>
                            </li>
                        )}
                    </ul>
                </div> */}
                <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
                    <h4 className="font-extrabold tracking-widest text-black">Segunda</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] flex flex-wrap gap-2 my-2">
                        {Object.entries(schedule.monday).map((el: any, index) =>
                            <li className="p-3 transition-all bg-white  shadow-md w-full text-black hover:translate-x-1" key={index}>
                                <Link className=" rounded-sm" href="/matricula">
                                    <span>{el[0]}h</span>
                                    <span className="font-light">&nbsp;-&nbsp;{el[1]}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
                    <h4 className="font-extrabold tracking-widest text-black">Terça</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] flex flex-wrap gap-2 my-2">
                        {Object.entries(schedule.tuesday).map((el: any, index) =>
                            <li className="p-3 transition-all bg-white  shadow-md w-full text-black hover:translate-x-1" key={index}>
                                <Link className=" rounded-sm" href="/matricula">
                                    <span>{el[0]}h</span>
                                    <span className="font-light">&nbsp;-&nbsp;{el[1]}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
                    <h4 className="font-extrabold tracking-widest text-black">Quarta</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] flex flex-wrap gap-2 my-2">
                        {Object.entries(schedule.wednesday).map((el: any, index) =>
                            <li className="p-3 transition-all bg-white  shadow-md w-full text-black hover:translate-x-1 " key={index}>
                                <Link className=" rounded-sm" href="/matricula">
                                    <span>{el[0]}h</span>
                                    <span className="font-light">&nbsp;-&nbsp;{el[1]}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
                    <h4 className="font-extrabold tracking-widest text-black">Quinta</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] flex flex-wrap gap-2 my-2">
                        {Object.entries(schedule.thursday).map((el: any, index) =>
                            <li className="p-3 transition-all bg-white  shadow-md w-full text-black hover:translate-x-1 " key={index}>
                                <Link className=" rounded-sm" href="/matricula">
                                    <span>{el[0]}h</span>
                                    <span className="font-light">&nbsp;-&nbsp;{el[1]}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
                    <h4 className="font-extrabold tracking-widest text-black">Sexta</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] flex flex-wrap gap-2 my-2">
                        {Object.entries(schedule.friday).map((el: any, index) =>
                            <li className="p-3 transition-all bg-white  shadow-md w-full text-black hover:translate-x-1 " key={index}>
                                <Link className=" rounded-sm" href="/matricula">
                                    <span>{el[0]}h</span>
                                    <span className="font-light">&nbsp;-&nbsp;{el[1]}</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
                    <h4 className="font-extrabold tracking-widest text-black">Sábado</h4>
                    <ul className="md:min-w-[140px] min-w-[60px] flex flex-wrap gap-2 my-2">
                        {Object.entries(schedule.saturday).map((el: any, index) =>
                            <li className="p-3 transition-all bg-white  shadow-md w-full text-black hover:translate-x-1 " key={index}>
                                <Link className=" rounded-sm" href="/matricula">
                                    <span>{el[0]}h</span>
                                    <span className="font-light">&nbsp;-&nbsp;{el[1]}</span>
                                </Link>
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
        <div className="bg-white text-white py-8 px-4 lg:px-16 flex flex-col gap-8 mb-10 items-center" style={{ boxShadow: '2px 2px 10px 0 rgba(0,0,0, 0.2)' }}>
            <div className="flex gap-4 mb-6">
                {UNITS.map((unit) => (
                    <button
                        key={unit}
                        className={`px-4 py-2 rounded ${currentUnit === unit ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setCurrentUnit(unit)}
                    >
                        {unit === 'lago-sul' ? 'Lago Sul' : 'Asa Norte'}
                    </button>
                ))}
            </div>

            <ul className="flex  list-none text-2xl font-questrial text-black">
                {/* <li className="lg:w-[160px] md:w-[120px] text-center">Domingo</li> */}
                <li className="lg:w-[160px] md:w-[120px] text-center">Segunda</li>
                <li className="lg:w-[160px] md:w-[120px] text-center">Terça</li>
                <li className="lg:w-[160px] md:w-[120px] text-center">Quarta</li>
                <li className="lg:w-[160px] md:w-[120px] text-center">Quinta</li>
                <li className="lg:w-[160px] md:w-[120px] text-center">Sexta</li>
                <li className="lg:w-[160px] md:w-[120px] text-center">Sábado</li>
            </ul>
            <div className="flex min-h-[400px]">
                {/* <ul className="lg:w-[160px] md:w-[120px] border-r border-[#8A8A8A] font-inter">
                    {Object.entries(schedule.sunday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link className="bg-slate-900 p-2 rounded-sm" href='/matricula'>{el[1]} - {el[0]}h</Link>
                        </li>
                    )}
                </ul> */}
                <ul className="lg:w-[160px] md:w-[120px] flex flex-col gap-2 px-2 border-r border-[#8A8A8A]">
                    {schedule.monday && Object.entries(schedule.monday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link className="bg-white shadow-md text-black p-2 rounded-sm flex flex-col transition-all hover:scale-105" href='/matricula'>
                                <span className="font-bold">{el[0]}h</span>
                                <span className="font-light">{el[1]}</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:w-[160px] md:w-[120px] flex flex-col gap-2 px-2 border-r border-[#8A8A8A]">
                    {schedule.tuesday && Object.entries(schedule.tuesday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link className="bg-white shadow-md text-black p-2 rounded-sm flex flex-col transition-all hover:scale-105" href='/matricula'>
                                <span className="font-bold">{el[0]}h</span>
                                <span className="font-light">{el[1]}</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:w-[160px] md:w-[120px] flex flex-col gap-2 px-2 border-r border-[#8A8A8A]">
                    {schedule.wednesday && Object.entries(schedule.wednesday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link className="bg-white shadow-md text-black p-2 rounded-sm flex flex-col transition-all hover:scale-105" href='/matricula'>
                                <span className="font-bold">{el[0]}h</span>
                                <span className="font-light">{el[1]}</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:w-[160px] md:w-[120px] flex flex-col gap-2 px-2 border-r border-[#8A8A8A]">
                    {schedule.thursday && Object.entries(schedule.thursday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link className="bg-white shadow-md text-black p-2 rounded-sm flex flex-col transition-all hover:scale-105" href='/matricula'>
                                <span className="font-bold">{el[0]}h</span>
                                <span className="font-light">{el[1]}</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:w-[160px] md:w-[120px] flex flex-col gap-2 px-2 border-r border-[#8A8A8A]">
                    {schedule.friday && Object.entries(schedule.friday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link className="bg-white shadow-md text-black p-2 rounded-sm flex flex-col transition-all hover:scale-105" href='/matricula'>
                                <span className="font-bold">{el[0]}h</span>
                                <span className="font-light">{el[1]}</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="lg:w-[160px] md:w-[120px] flex flex-col gap-2 px-2">
                    {schedule.saturday && Object.entries(schedule.saturday).map((el: any, index) =>
                        <li className="text-center" key={index}>
                            <Link className="bg-white shadow-md text-black p-2 rounded-sm flex flex-col transition-all hover:scale-105" href='/matricula'>
                                <span className="font-bold">{el[0]}h</span>
                                <span className="font-light">{el[1]}</span>
                            </Link>
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