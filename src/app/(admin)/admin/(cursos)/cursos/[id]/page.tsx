import TeamForm from "./course-form";

export default function Page({ params }: { params: { id: string } }) {
    return <TeamForm id={params.id} />
}