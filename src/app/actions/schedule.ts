import scheduleService from "@/services/schedule.service"

export async function insertSchedule(state: any, form: FormData) {
    const day = form.get("day")?.toString()!
    const hour = form.get("hour")?.toString()!
    const modality = form.get("modality")?.toString()!
    const unit = form.get("unit")?.toString()!

    return await scheduleService.insertSchedule(day, hour, modality, unit)
}

export async function updateSchedule(state: any, form: FormData) {
    const day = form.get("day")?.toString()!
    const hour = form.get("hour")?.toString()!

    return await scheduleService.updateSchedule(day, hour)
}