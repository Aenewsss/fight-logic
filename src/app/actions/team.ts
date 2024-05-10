import teamService from "@/services/team.service"

export async function insertTeam(state: any, form: FormData) {
    const image = form.get("image") as File
    const logo = form.get("logo") as File
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!

    return await teamService.insertTeam(logo, image, text, name)
}

export async function updateTeam(state: any, form: FormData) {
    const image = form.get("image") as File
    const logo = form.get("logo") as File
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!
    const id = form.get("id")?.toString()!

    return await teamService.updateTeam(id, logo, image, text, name)
}