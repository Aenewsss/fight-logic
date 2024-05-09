import Image from "next/image";
import { SignupForm } from "./signup-form";
import Link from "next/link";

export default function Page() {
    return (
        <section className="flex items-center justify-center w-full flex-col gap-4 bg-black">
            <Image unoptimized src="/logo-amarela.png" width={300} height={300} alt="Foto do Time" />
            <SignupForm />
            <span className="text-white text-sm">
                Já possui uma conta?&nbsp;
                <Link href="/login" className="underline text-blue-400">clique aqui</Link>
            </span>
        </section>
    )
}