import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="flex justify-center pb-8 pt-8">
            {children}
            <Link className="fixed bottom-4 left-4 text-blue-500 hover:underline" href="/">← Visitar site</Link>
            <div className="fixed flex items-center justify-center -z-10 top-0 w-full h-full">
                <Image className="w-1/2 opacity-5" src="/logo-amarela-dark.png" width={300} height={300} alt="Logo Fight Logic" />
            </div>
        </main>
    )
}