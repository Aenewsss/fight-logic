import Image from "next/image";

export default function Gallery() {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 overflow-hidden relative">
            <Image className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-black drop-shadow-md z-10" src='/logo-branca.png' width={300} height={58} alt="Logo Amarela Fight Logic" />
            <Image unoptimized className="h-[500px] w-full object-cover" src='/meninas-fight.jpeg' width={106} height={58} alt="Foto dos alunos" />
            <Image unoptimized className="h-[500px] w-full object-cover" src='/alunos-competicao.jpeg' width={106} height={58} alt="Foto da nossa aula" />
            <div className="bg-black w-full h-full absolute top-0 left-0 z-0 opacity-40"></div>
        </div>

    )
}