import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            <Link className="absolute top-4 left-4 text-blue-500 hover:underline" href="/">← Visitar site</Link>
            {children}
        </main>
    )
}