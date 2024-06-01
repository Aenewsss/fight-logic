import Image from "next/image";
import Link from "next/link";

export default function Competition() {
    return (
        <section className="mb-10" id="aula-particular">

            <div className="flex mt-10 relative items-center justify-center z-0 flex-col">
                <Image unoptimized className="h-[500px] object-cover w-full" src="/marceu-vencedor.jpg" width={500} height={500} alt="foto marcéu campeão jiu-jitsu" />
                <div className="absolute z-20 flex flex-col items-center gap-8">
                    <h2 className="md:text-[3.5rem] text-4xl text-white md:font-semibold text-center font-questrial leading-[4rem]">
                        Competições de<br/>
                        JIU-JITSU / GRAPPLING / MMA
                    </h2>
                    <Link href="/competicoes" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Quero saber mais</Link>
                </div>
                <div className="absolute w-full h-full z-10 bg-black opacity-70"></div>
            </div>
        </section>
    )

}