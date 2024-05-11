import ScheduleBoard from "@/components/ScheduleBoard";

export default function Page() {
    return (
        <main className="container mx-auto md:pt-32 flex flex-col pb-10">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center mb-8">Grade Horária Fight Logic</h1>
            <ScheduleBoard />
        </main>
    )
}