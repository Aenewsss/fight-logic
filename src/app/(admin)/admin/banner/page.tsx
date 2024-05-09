import Link from "next/link";
import BannerForm from "./banner-form";

export default function Page() {
    return (
        <section className="container m-5 flex flex-col items-center">
            <Link className="absolute top-4 left-4 text-gray-700 hover:underline" href="/admin">← Voltar</Link>
            <h1 className="text-4xl">Banner do Topo</h1>
            <p>Alterar o banner que fica no topo do site</p>

            <BannerForm />
        </section>
    )
}