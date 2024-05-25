import { database, storage } from "@/app/lib/firebase";
import { IResponse } from "@/interfaces";
import { get, ref, set, update } from "firebase/database";
import { deleteObject, ref as storageRef, uploadBytes } from "firebase/storage";


class BannerService {
    async getCurrentBanner(): Promise<IResponse> {
        const bannerRef = ref(database, 'banner/');
        const banner = await get(bannerRef)

        if (!banner.exists()) return { data: null, error: 'Nenhum banner encontrado' }

        return { error: null, data: banner.val() }
    }

    async updateBanner(file: File): Promise<IResponse> {
        const dbRef = ref(database, 'banner/')
        const banner = await get(dbRef)

        if (!banner.exists()) return { data: null, error: 'Nenhum banner encontrado' }

        const filename = banner.val().split('/banner%2F')[1].split('?alt')[0]

        const removeStgRef = storageRef(storage, `banner/${filename}`)
        await deleteObject(removeStgRef)

        const stgRef = storageRef(storage, `banner/${file.name}`)
        const { metadata } = await uploadBytes(stgRef, file)

        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/banner%2F${metadata.name}?alt=media`

        await update(ref(database), { banner: imageUrl })

        return { data: imageUrl, error: null }
    }
}

const bannerService = new BannerService()
export default bannerService