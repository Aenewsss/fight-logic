import ScheduleBoard from "@/components/ScheduleBoard";
import Image from "next/image";

export default function Schedule() {
    return (
        <section className="relative">
            <Image unoptimized className="w-full object-cover rounded-t-[10%]" src="/horarios-foto.png" width={300} height={300} alt="Foto de fundo dos horários de aula" />
            <div className="w-full absolute top-0 h-full flex justify-center">
                <div className=" container mx-auto flex flex-col items-center gap-16 mt-16">
                    <h2 className="text-[3.5rem] font-questrial text-center text-white">Nossos horários</h2>
                    <ScheduleBoard />
                </div>
            </div>
        </section>
    )
}