import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <main className="container mx-auto md:pt-32 pt-10 pb-10  md:px-0 px-4 flex flex-col gap-8">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center">Aulas Particulares Fight Logic</h1>

            <div className="flex md:flex-nowrap flex-wrap gap-4 md:mt-10 md:max-h-[500px] overflow-hidden">
                <div className="overflow-hidden md:w-1/2">
                    <Image unoptimized className="md:scale-125 scale-[1.6] object-cover w-full max-h-[500px]" src="/private/time.jpeg" width={300} height={500} alt="foto aula paricular" />
                    {/* <Image unoptimized className="object-cover md:w-auto w-full max-h-[500px]" src="/private/rakel.jpeg" width={300} height={500} alt="foto aula paricular" /> */}
                </div>
                <div className="flex flex-col gap-4 md:w-1/2">
                    <h2 className="font-medium md:text-3xl text-xl">Qual é a vantagem de fazer aulas particulares?</h2>
                    <p className="md:text-xl">
                        Assim como um personal trainer, uma aula particular vai te proporcionar um jogo
                        de jiu-jitsu especifico de acordo com seu biotipo e predisposição de movimento
                        facilitando assim sua evolução em todos os aspectos.
                        As aulas são montadas e planejadas por uma equipe pedagógica que adequa a metodologia perfeita ao aluno
                    </p>
                    <div className="md:flex hidden">
                        <Image unoptimized className="object-cover w-1/2 max-h-[500px]" src="/private/marceu.jpg" width={300} height={500} alt="foto aula paricular" />
                        <Image unoptimized className="object-cover w-1/2 max-h-[500px]" src="/private/rakel.jpeg" width={300} height={500} alt="foto aula paricular" />
                    </div>
                </div>
            </div>
            <Image unoptimized className="md:hidden object-cover md:w-auto w-full h-[300px]" src="/private/marceu.jpg" width={300} height={300} alt="foto aula paricular" />

            <Link target="_blank" href="https://api.whatsapp.com/send?phone=5561993664879&amp;text=Olá, venho através do site e tenho interesse nas aulas particulares da Fight Logic." className="bg-black text-white px-8 py-1 flex md:self-center self-start font-questrial text-lg rounded-md transition-all hover:scale-105">Quero aula particular</Link>
        </main>
    )
}