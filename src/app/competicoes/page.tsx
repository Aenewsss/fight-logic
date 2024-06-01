import Link from "next/link";

export default function Page() {
    return (
        <main className="container mx-auto md:pt-32 pt-10 pb-10  md:px-0 px-4 flex flex-col gap-8">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center">Competições de JIU-JITSU / GRAPPLING / MMA</h1>

            <div className="flex justify-center mt-8">
                <Link href="/matricula" className="bg-black text-white px-8 py-1 font-questrial text-lg rounded-md transition-all hover:scale-105">Matricular agora</Link>
            </div>
        </main>
    )
}