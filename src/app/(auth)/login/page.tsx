import Image from "next/image";
import Link from "next/link";
import { SigninForm } from "./signin-form";

export default function Page() {
    return (
        <section className="flex items-center justify-center w-full flex-col gap-4">
            <Image unoptimized src="/logo-amarela.png" width={300} height={300} alt="Foto do Time" />
            <SigninForm />
            <span className="text-white text-sm">
                Ainda não tem uma conta?&nbsp;
                <Link href="/cadastro" className="underline text-blue-400">clique aqui</Link>
            </span>
        </section>
    )
}