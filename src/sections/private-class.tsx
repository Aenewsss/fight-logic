import Image from "next/image";
import Link from "next/link";

export default function PrivateClass() {
    return (
        <section className="my-10" id="aula-particular">

            <div className="flex mt-10 relative items-center justify-center z-0 flex-col">
                <div className="flex">
                    <Image unoptimized className="h-[600px] object-cover w-1/3" src="/private/rakel.jpeg" width={500} height={500} alt="foto aula paricular" />
                    <Image unoptimized className="h-[600px] object-cover w-1/3" src="/private/time.jpeg" width={500} height={500} alt="foto aula paricular" />
                    <Image unoptimized className="h-[600px] object-cover w-1/3" src="/private/marceu.jpg" width={500} height={500} alt="foto aula paricular" />
                </div>
                <div className="absolute z-20 flex flex-col items-center gap-8">
                    <h2 className="md:text-[3.5rem] text-4xl text-white font-semibold text-center font-questrial leading-[3.5rem]">Transforme seu jogo<br />Faça aulas particulares</h2>
                    <Link target="_blank" href="https://api.whatsapp.com/send?phone=5561993664879&amp;text=Olá, venho através do site e tenho interesse nas aulas particulares da Fight Logic." className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Quero aula particular</Link>
                </div>
                <div className="absolute w-full h-full z-10 bg-black opacity-70"></div>
            </div>
        </section>
    )
}