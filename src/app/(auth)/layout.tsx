import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="bg-dark-gray h-screen flex">
            <Image unoptimized className="h-full object-cover w-1/2 hidden md:block" src="/login.jpeg" width={100} height={100} alt="Foto do Time" />
            {children}
        </main>
    )
}