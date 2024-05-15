'use client'
import Image from "next/image";
import Link from "next/link";
import paymentService from "@/services/payment.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Section() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (!searchParams.get('success')) return router.push('/matricula')
        else expireSession()
    }, [searchParams]);

    async function expireSession() {
        await paymentService.expireSession(searchParams.get('session'))
    }
    return (
        <section className="container mx-auto md:px-0 px-4 text-white flex flex-col items-center gap-4 text-center">

            <Image className="drop-shadow-2xl shadow-white" src="/icons/check-pagamento.svg" width={200} height={200} alt="ícone check-pagamento" />
            <h2 className="text-xl font-inter uppercase tracking-wide">Parabéns por querer fazer parte desse time!</h2>
            <h1 className="md:text-[3.5rem] text-4xl font-questrial my-4 uppercase font-bold tracking-widest">Pagamento confirmado</h1>
            <p className="text-base font-inter tracking-wide">Os detalhes da sua matrícula chegarão pelo e-mail cadastrado no momento da compra.</p>
            <Link className="underline underline-offset-1" href="/">Voltar para o site</Link>
        </section>
    )
}