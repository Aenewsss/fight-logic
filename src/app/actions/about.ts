import aboutService from "@/services/about.service"

export async function aboutAction(state: any, form: FormData) {
    const text = form.get("text").toString()!
    const file = form.get("file") as File

    return await aboutService.updateAbout(file, text)
}