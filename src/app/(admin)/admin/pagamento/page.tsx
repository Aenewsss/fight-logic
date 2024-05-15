import Link from "next/link";
import ProductsList from "./products-list";

export default function Page() {
    return (
        <main className="container mx-auto text-center md:px-0 px-4">
            <Link className="absolute top-4 left-4 text-gray-700 hover:underline" href="/admin">← Voltar</Link>

            <h1 className="text-4xl">Área de Pagamentos</h1>
            <p>Informe os valores dos planos de assinatura</p>

            <ProductsList />
            <Link className=" bg-amber-400 px-3 py-1 rounded-md" href="/admin/pagamento/criar-produto">Criar novo produto</Link>
        </main>
    )
}