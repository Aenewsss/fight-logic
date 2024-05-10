import { database, storage } from "@/app/lib/firebase";
import { IResponse } from "@/interfaces";
import { get, ref, set, update } from "firebase/database";
import { deleteObject, ref as storageRef, uploadBytes } from "firebase/storage";

class AboutService {
    async getAbout(): Promise<IResponse> {
        const aboutRef = ref(database, 'about/');
        const about = await get(aboutRef)
        console.log(about.val())
        if (!about.exists()) return { data: null, error: 'Sobre não encontrado' }

        return { error: null, data: about.val() }
    }

    async updateAbout(file: File, text: string): Promise<IResponse> {
        const aboutRef = ref(database, 'about/');
        const about = await get(aboutRef)

        if (!about.exists()) return { data: null, error: 'Sobre não encontrado' }

        if (file.name) {
            const filename = about.val().image.split('/about%2F')[1].split('?alt')[0]

            const removeStgRef = storageRef(storage, `about/${filename}`)
            await deleteObject(removeStgRef)

            const stgRef = storageRef(storage, `about/${file.name}`)
            const { metadata } = await uploadBytes(stgRef, file)

            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/about%2F${metadata.name}?alt=media`
            await update(ref(database, 'about/'), { text, image: imageUrl })

            return { data: about.val(), error: null }
        } else {
            await update(ref(database, 'about/'), { text })
            return { data: true, error: null }
        }
    }
}

const aboutService = new AboutService()
export default aboutService