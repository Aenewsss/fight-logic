import competitionService from "@/services/competition.service"

export async function competition(state: any, form: FormData) {
    const text = form.get("text")?.toString()!

    return await competitionService.updateCompetitionText(text)
}