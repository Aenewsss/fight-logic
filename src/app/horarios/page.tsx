import ScheduleBoard from "@/components/ScheduleBoard";

export default function Page() {
    return (
        <main className="container mx-auto pt-32 flex flex-col">
            <h1 className="text-[3.5rem] font-questrial text-center mb-8">Grade Horária Fight Logic</h1>
            <ScheduleBoard />
        </main>
    )
}