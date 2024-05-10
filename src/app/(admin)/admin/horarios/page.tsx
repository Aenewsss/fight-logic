import Link from "next/link";
import ScheduleBoard from "./schedule-board";

export default function Page() {
    return (
        <section className="container m-5 flex flex-col items-center">
            <Link className="absolute top-4 left-4 text-gray-700 hover:underline" href="/admin">← Voltar</Link>
            <h1 className="text-4xl">Horários de aulas</h1>
            <p>Informe os horários de funcionamento da Fight Logic</p>

            <ScheduleBoard />
        </section>
    )
}