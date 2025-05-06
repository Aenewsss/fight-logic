import { insertSchedule } from "@/app/actions/schedule"
import { useFormState } from "react-dom"
import ScheduleButton from "./schedule-button"
import { ToastContainer, toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface IProps {
    setShowFormToAdd: any
}

export default function ScheduleAddForm({ setShowFormToAdd }: IProps) {
    const [state, action] = useFormState(insertSchedule, undefined)
    const [currentUnit, setCurrentUnit] = useState("lago-sul");

    const [hour, setHour] = useState();

    function formatHour(e) {
        let { value } = e.target

        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (value.length > 2) {
            value = `${value.slice(0, 2)}:${value.slice(2)}`
        }
        setHour(value)
    }

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Horário adicionado com sucesso', { type: "success" });
            setTimeout(() => {
                setShowFormToAdd(false)
            }, 1000);
        }
    }, [state]);

    return (
        <form action={action} className="mt-8 bg-white p-8 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Dia da Semana</label>
                <select className="px-4 border rounded py-2 cursor-pointer" name="day" id="day">
                    <option selected value="monday">Segunda</option>
                    <option value="tuesday">Terça</option>
                    <option value="wednesday">Quarta</option>
                    <option value="thursday">Quinta</option>
                    <option value="friday">Sexta</option>
                    <option value="saturday">Sábado</option>
                    <option value="sunday">Domingo</option>
                </select>
            </div>
            <div className="space-y-2">
                <label htmlFor="unit" className="block font-medium">Unidade</label>
                <select
                    name="unit"
                    id="unit"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    value={currentUnit}
                    onChange={(e) => setCurrentUnit(e.target.value)}
                >
                    <option value="">Selecione a unidade</option>
                    <option value="lago-sul">Lago Sul</option>
                    <option value="asa-norte">Asa Norte</option>
                </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Horário</label>
                <input value={hour} required onChange={formatHour} placeholder="12:30" maxLength={5} minLength={5} className="px-4 border rounded py-2" id="hour" type="text" name="hour" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Modalidade</label>
                <input required placeholder="Jiu Jitsu" className="px-4 border rounded py-2" id="modality" type="text" name="modality" />
            </div>
            <div className="flex flex-col gap-2 self-start">
                <ScheduleButton />
                <button onClick={_ => setShowFormToAdd(false)} type="button" className="bg-slate-300 py-1 rounded-md">Cancelar</button>
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}