import ScheduleBoard from "@/components/ScheduleBoard";
import Image from "next/image";

export default function Schedule() {
    return (
        <section className="relative ">
            <Image unoptimized className="shadow-[-4px_-4px_20px_0_rgba(0,0,0,0.4)] shadow-black w-full object-cover md:rounded-t-[10%] rounded-t-[5%] md:min-h-[400px] min-h-[800px]" src="/horarios-foto.png" width={300} height={300} alt="Foto de fundo dos horários de aula" />
            <div className="w-full absolute top-0 h-full flex justify-center">
                <div className=" container mx-auto flex flex-col items-center md:gap-16 gap-8 mt-16 md:px-0 px-4">
                    <h2 className="md:text-[3.5rem] text-4xl font-questrial text-center text-white">Nossos horários</h2>
                    <ScheduleBoard />
                </div>
            </div>
        </section>
    )
}