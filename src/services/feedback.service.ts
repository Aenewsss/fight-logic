import { database, storage } from "@/app/lib/firebase"
import { IResponse } from "@/interfaces"
import { get, ref, remove, set, update } from "firebase/database"
import { deleteObject, ref as storageRef, uploadBytes } from "firebase/storage";

class FeedbackService {
    async getFeedbacks(): Promise<IResponse> {
        const dbRef = ref(database, 'feedbacks/')
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Nenhum feedback encontrado' }

        return { error: null, data: data.val().filter(Boolean) }
    }

    async insertFeedback(file: File, text: string, name: string): Promise<IResponse> {
        try {
            if (file) {

                const stgRef = storageRef(storage, `feedbacks/${file.name}`)
                const { metadata } = await uploadBytes(stgRef, file)

                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/feedbacks%2F${metadata.name}?alt=media`

                const getDbRef = ref(database, 'feedbacks/')
                const data = await get(getDbRef)
                const id = !data.exists() ? 1 : data.val().length

                const setRef = ref(database, `feedbacks/${id}`)

                await set(setRef, {
                    image: imageUrl,
                    text,
                    name,
                })

                return { error: null, data: true }
            } else {
                const getDbRef = ref(database, 'feedbacks/')
                const data = await get(getDbRef)
                const id = !data.exists() ? 1 : data.val().length

                const setRef = ref(database, `feedbacks/${id}`)

                await update(setRef, {
                    text,
                    name,
                })
            }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async removeFeedback(id: string, url: string): Promise<IResponse> {
        try {
            const dbRef = ref(database, `feedbacks/${id}`)
            await remove(dbRef)

            const filename = url.split('/feedbacks%2F')[1].split('?alt')[0]

            const removeStgRef = storageRef(storage, `feedbacks/${filename}`)
            await deleteObject(removeStgRef)


            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async updateFeedback(id: string, file: File, text: string, name: string): Promise<IResponse> {
        try {
            const imgRef = ref(database, `feedbacks/${id}`)
            const feedback = await get(imgRef)

            if (!feedback.exists()) return { data: null, error: 'Feedback não encontrado' }

            const filename = feedback.val().image.split('/feedbacks%2F')[1].split('?alt')[0]

            const removeStgRef = storageRef(storage, `feedbacks/${filename}`)
            await deleteObject(removeStgRef)

            const stgRef = storageRef(storage, `feedbacks/${file.name}`)
            const { metadata } = await uploadBytes(stgRef, file)

            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/feedbacks%2F${metadata.name}?alt=media`

            const dbRef = ref(database, `feedbacks/${id}`)
            await set(dbRef, {
                image: imageUrl,
                text,
                name,
            })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

}

const feedbackService = new FeedbackService()
export default feedbackService