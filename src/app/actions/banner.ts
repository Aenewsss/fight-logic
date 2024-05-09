import bannerService from "@/services/banner.service"

export async function banner(state: any, form: FormData) {
    const file = form.get("file") as File
    await bannerService.updateBanner(file)
}