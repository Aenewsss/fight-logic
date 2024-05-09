import { database, storage } from "@/app/lib/firebase";
import { IResponse } from "@/interfaces";
import { child, get, ref } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";


class BannerService {
    async getCurrentBanner(): Promise<IResponse> {
        const bannerRef = ref(database, 'banner/');
        const banner = await get(bannerRef)

        if (!banner.exists()) return { data: null, error: 'Nenhum banner encontrado' }

        return { error: null, data: banner.val() }
    }

    async updateBanner(file: File): Promise<IResponse> {
        const bannerRef = storageRef(storage, `banner/${file.name}`)

        const data = await uploadBytes(bannerRef, file)
        
    }
}

const bannerService = new BannerService()
export default bannerService