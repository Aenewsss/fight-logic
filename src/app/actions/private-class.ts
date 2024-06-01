import privateClassService from "@/services/private-class.service"

export async function privateClass(state: any, form: FormData) {
    const text = form.get("text")?.toString()!

    return await privateClassService.updatePrivateClassText(text)
}