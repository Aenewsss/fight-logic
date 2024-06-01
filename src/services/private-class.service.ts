import { database } from "@/app/lib/firebase"
import { IResponse } from "@/interfaces"
import { get, ref, update } from "firebase/database"

class PrivateClassService {
    async getPrivateClassText() {
        const dbRef = ref(database, 'private-class/')
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Texto não encontrado' }

        return { error: null, data: data.val() }
    }

    async updatePrivateClassText(text: string): Promise<IResponse> {
        try {
            const dbRef = ref(database)

            await update(dbRef, { 'private-class': text })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

}

const privateClassService = new PrivateClassService()
export default privateClassService