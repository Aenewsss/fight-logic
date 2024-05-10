'use client'

import scheduleService from "@/services/schedule.service";
import { useEffect, useState } from "react";
import ScheduleAddForm from "./schedule-add-form";
import { ISchedule } from "@/interfaces";
import { ToastContainer, toast } from "react-toastify";

export default function ScheduleBoard() {

    const [schedules, setSchedules] = useState<ISchedule>();
    const [loading, setLoading] = useState(false);
    const [showFormToAdd, setShowFormToAdd] = useState(false);

    useEffect(() => {
        getSchedules()
    }, [showFormToAdd]);

    async function getSchedules() {
        setLoading(true)
        const { data } = await scheduleService.getSchedules()
        setSchedules(data)
        setLoading(false)
    }

    function checkIsEmpty() {
        return Object.values(schedules).filter(Boolean)
    }

    async function removeHour(id: string, hour: string) {
        try {
            await scheduleService.removeSchedule(id, hour)
            toast('Horário removido com sucesso', { type: "success" });
            getSchedules()
        } catch (error) {
            toast('Erro ao remover horário', { type: "error" });

        }
    }

    if (loading || !schedules) return <p className="mt-8">Carregando</p>

    if (!checkIsEmpty() || showFormToAdd) return <ScheduleAddForm setShowFormToAdd={setShowFormToAdd} />

    return (
        <div className="bg-white p-8 mt-8 w-full flex flex-col items-center">
            <table className="table-auto w-full rounded-md overflow-hidden">
                <thead>
                    <tr className="bg-slate-300">
                        <th>Segunda</th>
                        <th>Terça</th>
                        <th>Quarta</th>
                        <th>Quinta</th>
                        <th>Sexta</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Object.keys(schedules.monday).map((el: string) => <p className="text-center">{el} <span onClick={_ => removeHour('monday', el)} className="text-red-500 cursor-pointer text-lg">x</span> </p>)}</td>
                        <td>{Object.keys(schedules.tuesday).map((el: string) => <p className="text-center">{el} <span onClick={_ => removeHour('tuesday', el)} className="text-red-500 cursor-pointer text-lg">x</span> </p>)}</td>
                        <td>{Object.keys(schedules.wednesday).map((el: string) => <p className="text-center">{el} <span onClick={_ => removeHour('wednesday', el)} className="text-red-500 cursor-pointer text-lg">x</span> </p>)}</td>
                        <td>{Object.keys(schedules.thursday).map((el: string) => <p className="text-center">{el} <span onClick={_ => removeHour('thursday', el)} className="text-red-500 cursor-pointer text-lg">x</span> </p>)}</td>
                        <td>{Object.keys(schedules.friday).map((el: string) => <p className="text-center">{el} <span onClick={_ => removeHour('friday', el)} className="text-red-500 cursor-pointer text-lg">x</span> </p>)}</td>
                        <td>{Object.keys(schedules.saturday).map((el: string) => <p className="text-center">{el} <span onClick={_ => removeHour('saturday', el)} className="text-red-500 cursor-pointer text-lg">x</span> </p>)}</td>
                        <td>{Object.keys(schedules.sunday).map((el: string) => <p className="text-center">{el} <span onClick={_ => removeHour('sunday', el)} className="text-red-500 cursor-pointer text-lg">x</span> </p>)}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={_ => setShowFormToAdd(true)} className="mt-8 bg-amber-400 px-4 py-1 rounded-md hover:scale-105">Adicionar Horário</button>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </div>
    )
}