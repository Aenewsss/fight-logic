import { Suspense } from "react";
import Section from "./section";

export default function Page() {
    return (
        <main className="md:pt-32 pb-40 bg-green-400">
            <Suspense fallback={<p className="text-center">Carregando...</p>}>
                <Section />       
            </Suspense>
        </main>
    )
}

