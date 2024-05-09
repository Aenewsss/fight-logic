import diferentialsService from "@/services/diferentials.service"

export async function diferentials(state: any, form: FormData) {
    const id = form.get("id")?.toString()!
    const title = form.get("title")?.toString()!
    const description = form.get("description")?.toString()!

    return await diferentialsService.updateDiferential(id,title, description)
}