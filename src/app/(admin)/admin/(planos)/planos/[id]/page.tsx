import PlanForm from "./plan-form";

export default function Page({ params }: { params: { id: string } }) {
    return <PlanForm id={params.id} />
}