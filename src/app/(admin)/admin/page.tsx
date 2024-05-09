import Cards from "./Cards";

export default function Page() {
    return (
        <section className="m-5 flex flex-col items-center container">
            <h1 className="text-4xl">Painel do Administrador</h1>
            <p className="mt-2">Neste painel será possível configurar alguns dados do seu site, como fotos, vídeos, textos e valor dos planos</p>
            <Cards />
        </section>
    )
}