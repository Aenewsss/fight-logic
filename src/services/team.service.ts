import { database, storage } from "@/app/lib/firebase"
import { IResponse } from "@/interfaces"
import { get, ref, remove, set, update } from "firebase/database"
import { deleteObject, ref as storageRef, uploadBytes } from "firebase/storage";

class TeamService {
    async getTeams(): Promise<IResponse> {
        const dbRef = ref(database, 'teams/')
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Nenhuma equipe encontrada' }

        return { error: null, data: data.val().filter(Boolean) }
    }

    async insertTeam(logoFile: File, teamFile: File, text: string, name: string): Promise<IResponse> {
        try {
            const stgLogoRef = storageRef(storage, `teams/${logoFile.name}`)
            const stgTeamRef = storageRef(storage, `teams/${teamFile.name}`)

            const { metadata: metadataLogo } = await uploadBytes(stgLogoRef, logoFile)
            const { metadata: metadataTeam } = await uploadBytes(stgTeamRef, teamFile)

            const logoUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataLogo.bucket}/o/teams%2F${metadataLogo.name}?alt=media`
            const teamUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataTeam.bucket}/o/teams%2F${metadataTeam.name}?alt=media`

            const getDbRef = ref(database, 'teams/')
            const data = await get(getDbRef)
            const id = !data.exists() ? 1 : data.val().length

            const setRef = ref(database, `teams/${id}`)

            await set(setRef, {
                logo: logoUrl,
                image: teamUrl,
                text,
                name,
            })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async removeTeam(id: string, logoUrl: string, teamUrl: string): Promise<IResponse> {
        try {
            const dbRef = ref(database, `teams/${id}`)
            await remove(dbRef)

            const logoFilename = logoUrl.split('/teams%2F')[1].split('?alt')[0]
            const teamFilename = teamUrl.split('/teams%2F')[1].split('?alt')[0]

            const removeStgLogoRef = storageRef(storage, `teams/${logoFilename}`)
            const removeStgTeamRef = storageRef(storage, `teams/${teamFilename}`)

            await deleteObject(removeStgLogoRef)
            await deleteObject(removeStgTeamRef)

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async updateTeam(id: string, logoFile: File, teamFile: File, text: string, name: string): Promise<IResponse> {
        try {

            if (!logoFile.name && !teamFile.name) {
                const dbRef = ref(database, `teams/${id}`)
                await update(dbRef, {
                    text,
                    name,
                })
            } else if (logoFile.name) {
                const imgRef = ref(database, `teams/${id}`)
                const team = await get(imgRef)

                if (!team.exists()) return { data: null, error: 'Equipe não encontrada' }

                const logoFilename = team.val().logo.split('/teams%2F')[1].split('?alt')[0]
                const removeStgLogoRef = storageRef(storage, `teams/${logoFilename}`)
                await deleteObject(removeStgLogoRef)
                const stgLogoRef = storageRef(storage, `teams/${logoFile.name}`)
                const { metadata: metadataLogo } = await uploadBytes(stgLogoRef, logoFile)
                const logoUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataLogo.bucket}/o/teams%2F${metadataLogo.name}?alt=media`
                const dbRef = ref(database, `teams/${id}`)
                await update(dbRef, {
                    logo: logoUrl,
                    text,
                    name,
                })

                return { error: null, data: true }
            } else if (teamFile.name) {
                const imgRef = ref(database, `teams/${id}`)
                const team = await get(imgRef)

                if (!team.exists()) return { data: null, error: 'Equipe não encontrada' }

                const teamFilename = team.val().image.split('/teams%2F')[1].split('?alt')[0]
                const removeStgTeamRef = storageRef(storage, `teams/${teamFilename}`)
                await deleteObject(removeStgTeamRef)
                const stgTeamRef = storageRef(storage, `teams/${teamFile.name}`)
                const { metadata: metadataTeam } = await uploadBytes(stgTeamRef, teamFile)
                const teamUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataTeam.bucket}/o/teams%2F${metadataTeam.name}?alt=media`
                const dbRef = ref(database, `teams/${id}`)
                await update(dbRef, {
                    image: teamUrl,
                    text,
                    name,
                })

                return { error: null, data: true }
            } else {
                const imgRef = ref(database, `teams/${id}`)
                const team = await get(imgRef)

                if (!team.exists()) return { data: null, error: 'Equipe não encontrada' }

                const logoFilename = team.val().logo.split('/teams%2F')[1].split('?alt')[0]
                const teamFilename = team.val().image.split('/teams%2F')[1].split('?alt')[0]

                const removeStgLogoRef = storageRef(storage, `teams/${logoFilename}`)
                const removeStgTeamRef = storageRef(storage, `teams/${teamFilename}`)

                await deleteObject(removeStgLogoRef)
                await deleteObject(removeStgTeamRef)

                const stgLogoRef = storageRef(storage, `teams/${logoFile.name}`)
                const stgTeamRef = storageRef(storage, `teams/${teamFile.name}`)

                const { metadata: metadataLogo } = await uploadBytes(stgLogoRef, logoFile)
                const { metadata: metadataTeam } = await uploadBytes(stgTeamRef, teamFile)

                const logoUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataLogo.bucket}/o/teams%2F${metadataLogo.name}?alt=media`
                const teamUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataTeam.bucket}/o/teams%2F${metadataTeam.name}?alt=media`

                const dbRef = ref(database, `teams/${id}`)
                await set(dbRef, {
                    logo: logoUrl,
                    image: teamUrl,
                    text,
                    name,
                })

                return { error: null, data: true }
            }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

}

const teamService = new TeamService()
export default teamService