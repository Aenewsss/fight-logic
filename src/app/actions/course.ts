import courseService from "@/services/courses.service"

export async function insertCourse(state: any, form: FormData) {
    const image = form.get("image") as File
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!
    const link = form.get("link")?.toString()!

    return await courseService.insertCourse(image, text, name, link)
}

export async function updateCourse(state: any, form: FormData) {
    const image = form.get("image") as File
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!
    const link = form.get("link")?.toString()!
    const id = form.get("id")?.toString()!

    return await courseService.updateCourse(id, image, text, name, link)
}