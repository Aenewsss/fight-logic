import TeamForm from "./team-form";

export default function Page({ params }: { params: { id: string } }) {
    return <TeamForm id={params.id} />
}