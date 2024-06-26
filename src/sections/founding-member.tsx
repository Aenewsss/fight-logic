import Reveal from "@/app/hooks/Reveal";
import Image from "next/image";
import Link from "next/link";

export default function FoundingMember() {
    return (
        <section className="my-20 relative flex justify-center items-center" id="fundador">
            <Image className="absolute -top-[4rem] drop-shadow-md shadow-amber-400" unoptimized src="/icons/stars.svg" width={300} height={108} alt="Ícone de estrelas" />
            <Image unoptimized className="w-screen md:h-[400px] h-[600px] object-cover" src="/membros-fundadores.png" width={300} height={108} alt="Foto de fundo do time" />
            <div className="absolute flex flex-col gap-10 text-white items-center justify-center container text-center mt-4">
                <Reveal animation="opacity">
                    <h2 className="font-questrial md:text-[3.5rem] text-4xl">Benefícios exclusivos para membros fundadores</h2>
                </Reveal>
                <Reveal animation="opacity">
                    <p className="text-base text-center font-semibold  md:px-0 px-4">Treine de maneira mais inteligente e economize! Os membros fundadores</p>
                    <p className="text-base text-center font-semibold  md:px-0 px-4">receberão um desconto vitalício em nossa academia. Isso permite que você treine de forma</p>
                    <p className="text-base text-center font-semibold  md:px-0 px-4">mais consistente e alcance seus objetivos com mais rapidez, tudo por um preço acessível.</p>
                </Reveal>
                <Reveal animation="to-top">
                    <Link href="/matricula" className="bg-white text-black px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
                </Reveal>
            </div>
        </section>
    )
}