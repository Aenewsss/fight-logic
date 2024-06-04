import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="container m-5 flex flex-col items-center">
            <Link className="absolute top-4 left-4 text-gray-700 hover:underline" href="/admin">← Voltar</Link>
            <h1 className="text-4xl">Planos Fight Logic</h1>
            <p className="mb-8">Nessa seção você poderá gerenciar os planos da academia Fight Logic</p>
            {children}
        </main>
    )
}