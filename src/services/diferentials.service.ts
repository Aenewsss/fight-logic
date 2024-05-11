import { database } from "@/app/lib/firebase"
import { IResponse } from "@/interfaces"
import { get, ref, set } from "firebase/database"

class DiferentialsService {
    async getDiferentials(): Promise<IResponse> {
        const dbRef = ref(database, 'diferentials/')
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Nenhum diferencial encontrado' }
        return { error: null, data: data.val().filter(Boolean) }
    }

    async updateDiferential(id: string, title: string, description: string): Promise<IResponse> {
        try {
            const dbRef = ref(database, `diferentials/${id}`)
            await set(dbRef, {
                title,
                description
            })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }


    }

}

const diferentialsService = new DiferentialsService()
export default diferentialsService