import { database } from "@/app/lib/firebase";
import { IResponse } from "@/interfaces";
import { get, ref, set } from "firebase/database";


class AboutService {
    async getAbout(): Promise<IResponse> {
        const aboutRef = ref(database, 'about/');
        const about = await get(aboutRef)

        if (!about.exists()) return { data: null, error: 'Sobre não encontrado' }

        return { error: null, data: about.val() }
    }

    async updateAbout(text: string): Promise<IResponse> {
        const aboutRef = ref(database, 'about/');
        const about = await get(aboutRef)

        if (!about.exists()) return { data: null, error: 'Sobre não encontrado' }

        await set(ref(database), { about: text })

        return { data: about.val(), error: null }
    }
}

const aboutService = new AboutService()
export default aboutService