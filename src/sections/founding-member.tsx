import Image from "next/image";
import Link from "next/link";

export default function FoundingMember() {
    return (
        <section className="my-20 relative flex justify-center items-center" id="fundador">
            <Image className="absolute -top-[4rem] drop-shadow-md shadow-amber-400" unoptimized src="/icons/stars.svg" width={300} height={108} alt="Ícone de estrelas" />
            <Image unoptimized className="w-full h-[338px]" src="/membros-fundadores.png" width={300} height={108} alt="Foto de fundo do time" />
            <div className="absolute flex flex-col gap-10 text-white items-center justify-center container text-center">
                <h2 className="font-questrial text-[3.5rem]">Benefícios exclusivos para membros fundadores</h2>
                <p className="text-base font-semibold">
                    Treine de maneira mais inteligente e economize!
                    Os membros fundadores receberão um desconto vitalício
                    em nossa academia. Isso permite que você treine de forma
                    mais consistente e alcance seus objetivos com
                    mais rapidez, tudo por um preço acessível.
                </p>
                <Link href="/matricula" className="bg-white text-black px-8 py-1 font-questrial text-lg rounded-md">Matricular agora</Link>
            </div>
        </section>
    )
}