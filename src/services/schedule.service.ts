import { database } from "@/app/lib/firebase"
import { IResponse } from "@/interfaces"
import { get, ref, remove, set, update } from "firebase/database"

class ScheduleService {
    async getSchedules(unit: string) {
        const dbRef = ref(database, `schedule/${unit}`)
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Nenhum horário encontrado' }

        return { error: null, data: data.val() }
    }

    async insertSchedule(id: string, hour: string, modality: string, unity: string): Promise<IResponse> {
        try {
            const setRef = ref(database, `schedule/${unity}/${id}`)

            await update(setRef, { [hour]: modality })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async removeSchedule(id: string, hour: string, unit:string): Promise<IResponse> {
        try {
            const dbRef = ref(database, `schedule/${unit}/${id}`)

            const schedule = await get(dbRef)
            const updatedSchedule = schedule.val()

            delete updatedSchedule[hour]

            console.log(updatedSchedule, id)
            if (updatedSchedule.length == 0) await set(dbRef, '')
            else set(dbRef, updatedSchedule)

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async updateSchedule(id: string, hour: string): Promise<IResponse> {
        try {
            const imgRef = ref(database, `schedule/${id}`)
            const team = await get(imgRef)

            if (!team.exists()) return { data: null, error: 'Horário não encontrado' }

            const dbRef = ref(database, `schedule/${id}`)
            await update(dbRef, { hour })

            return { error: null, data: true }

        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }
}

const scheduleService = new ScheduleService()
export default scheduleService