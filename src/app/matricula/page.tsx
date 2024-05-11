import BasicDataForm from "./basic-data-form";

export default function Page() {
    return (
        <main className="container mx-auto md:pt-10 pb-40">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center mb-8">Matricule-se agora e faça parte do melhor time de Brasília</h1>

            <BasicDataForm />
        </main>
    )
}