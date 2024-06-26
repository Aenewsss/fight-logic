import Reveal from "@/app/hooks/Reveal";
import ScheduleBoard from "@/components/ScheduleBoard";
import Image from "next/image";

export default function Schedule() {
    return (
        <section className="relative ">
            <Image unoptimized className="shadow-[-4px_-4px_20px_0_rgba(0,0,0,0.4)] shadow-black w-full object-cover md:rounded-t-[40px] rounded-t-[40px] md:min-h-[1160px] sm:min-h-[1360px] xs:min-h-[1660px] min-h-[1900px]" src="/horarios-foto.png" width={300} height={300} alt="Foto de fundo dos horários de aula" />
            <div className="w-full absolute top-0 h-full flex justify-center">
                <div className=" container mx-auto flex flex-col items-center md:gap-16 gap-8 mt-16 xs:px-0 px-4">
                    <Reveal animation="to-top">
                        <h2 className="md:text-[3.5rem] text-4xl font-questrial text-center text-white">Nossos horários</h2>
                    </Reveal>

                    <ScheduleBoard />
                </div>
            </div>
        </section>
    )
}