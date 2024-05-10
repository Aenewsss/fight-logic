import FeedbackForm from "./feedback-form";

export default function Page({ params }: { params: { id: string } }) {
    return <FeedbackForm id={params.id} />
}