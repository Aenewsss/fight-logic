import aboutService from "@/services/about.service"

export async function about(state: any, form: FormData) {
    const text = form.get("text").toString()!

    return await aboutService.updateAbout(text)
}