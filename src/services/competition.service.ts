import { database } from "@/app/lib/firebase"
import { IResponse } from "@/interfaces"
import { get, ref, update } from "firebase/database"

class CompetitionService {
    async getCompetitionText() {
        const dbRef = ref(database, 'competition/')
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Texto não encontrado' }

        return { error: null, data: data.val() }
    }

    async updateCompetitionText(text: string): Promise<IResponse> {
        try {
            const dbRef = ref(database)

            await update(dbRef, { 'competition': text })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

}

const competitionService = new CompetitionService()
export default competitionService