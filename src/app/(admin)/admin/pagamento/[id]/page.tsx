import ProductForm from "./product-form";

export default function Page({ params }: { params: { id: string } }) {
    return <ProductForm id={params.id} />
}