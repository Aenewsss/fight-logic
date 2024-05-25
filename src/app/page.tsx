import Contact from "@/sections/contact";
import Diferentials from "@/sections/diferentials";
import Feedbacks from "@/sections/feedbacks";
import FoundingMember from "@/sections/founding-member";
import Schedule from "@/sections/schedule";
import Teams from "@/sections/teams";
import Top from "@/sections/top";
import Image from "next/image";
import Reveal from "./hooks/Reveal";

export default function Home() {
  return (
    <main className="pb-10">
      <Top />

      <div className="grid md:grid-cols-2 grid-cols-1 overflow-hidden relative">
        <Image className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-black drop-shadow-md z-10" src='/logo-branca.png' width={300} height={58} alt="Logo Amarela Fight Logic" />
        <Image unoptimized className="max-h-[500px] w-full object-cover" src='/meninas-fight.jpeg' width={106} height={58} alt="Foto dos alunos" />
        <Image unoptimized className="max-h-[500px] w-full object-cover" src='/alunos-competicao.jpeg' width={106} height={58} alt="Foto da nossa aula" />
        <div className="bg-black w-full h-full absolute top-0 left-0 z-0 opacity-40"></div>
      </div>

      <Diferentials />
      <FoundingMember />
      <Feedbacks />
      <Teams />
      <Schedule />
      <Contact />
    </main>
  );
}
