import feedbackService from "@/services/feedback.service"

export async function insertFeedback(state: any, form: FormData) {
    const file = form.get("file") as File
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!

    return await feedbackService.insertFeedback(file, text, name)
}

export async function updateFeedback(state: any, form: FormData) {
    const file = form.get("file") as File
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!
    const id = form.get("id")?.toString()!

    return await feedbackService.updateFeedback(id, file, text, name)
}