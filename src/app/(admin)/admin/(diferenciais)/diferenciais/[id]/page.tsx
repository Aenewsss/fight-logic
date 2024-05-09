import DiferentialForm from "./diferential-form";

export default function Page({ params }: { params: { id: string } }) {
    return <DiferentialForm id={params.id} />
}