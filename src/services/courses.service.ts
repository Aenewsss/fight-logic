import { database, storage } from "@/app/lib/firebase"
import { IResponse } from "@/interfaces"
import { get, ref, remove, set, update } from "firebase/database"
import { deleteObject, ref as storageRef, uploadBytes } from "firebase/storage";

class CourseService {
    async getCourses(): Promise<IResponse> {
        const dbRef = ref(database, 'course/')
        const data = await get(dbRef)

        if (!data.exists()) return { data: null, error: 'Nenhum curso encontrado' }

        return { error: null, data: Object.values(data.val())?.filter(Boolean) }
    }

    async insertCourse(image: File, text: string, name: string, link: string): Promise<IResponse> {
        try {
            const stgCourseRef = storageRef(storage, `course/${image.name}`)

            const { metadata: metadataCourse } = await uploadBytes(stgCourseRef, image)

            const CourseUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataCourse.bucket}/o/course%2F${metadataCourse.name}?alt=media`

            const getDbRef = ref(database, 'course/')
            const data = await get(getDbRef)
            const id = !data.exists() ? 1 : data.val().length

            const setRef = ref(database, `course/${id}`)

            await set(setRef, {
                image: CourseUrl,
                text,
                name,
                link
            })

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async removeCourse(id: string, CourseUrl: string): Promise<IResponse> {
        try {
            const dbRef = ref(database, `course/${id}`)
            await remove(dbRef)

            const imagename = CourseUrl.split('/course%2F')[1].split('?alt')[0]

            console.log(imagename)
            const removeStgCourseRef = storageRef(storage, `course/${imagename}`)

            await deleteObject(removeStgCourseRef)

            return { error: null, data: true }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }

    async updateCourse(id: string, image: File, text: string, name: string, link: string): Promise<IResponse> {
        console.log(image)
        try {

            if (!image.name) {
                const dbRef = ref(database, `course/${id}`)

                const currentCourse = (await get(dbRef)).val()

                console.log(currentCourse)
                await update(dbRef, {
                    text,
                    name,
                    image: currentCourse.image,
                    link
                })
                return { error: null, data: true }

            } else if (image.name) {
                const imgRef = ref(database, `course/${id}`)
                const Course = await get(imgRef)

                if (!Course.exists()) return { data: null, error: 'Curso não encontrada' }

                const imagename = Course.val().image.split('/Courses%2F')[1].split('?alt')[0]
                const removeStgCourseRef = storageRef(storage, `course/${imagename}`)
                await deleteObject(removeStgCourseRef)
                const stgCourseRef = storageRef(storage, `course/${image.name}`)
                const { metadata: metadataCourse } = await uploadBytes(stgCourseRef, image)
                const CourseUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataCourse.bucket}/o/course%2F${metadataCourse.name}?alt=media`
                const dbRef = ref(database, `course/${id}`)
                await update(dbRef, {
                    image: CourseUrl,
                    text,
                    link,
                    name,
                })

                return { error: null, data: true }
            } else {
                const imgRef = ref(database, `course/${id}`)
                const Course = await get(imgRef)

                if (!Course.exists()) return { data: null, error: 'Curso não encontrado' }

                const imagename = Course.val().image.split('/course%2F')[1].split('?alt')[0]

                const removeStgCourseRef = storageRef(storage, `course/${imagename}`)

                await deleteObject(removeStgCourseRef)

                const stgCourseRef = storageRef(storage, `course/${image.name}`)

                const { metadata: metadataCourse } = await uploadBytes(stgCourseRef, image)

                const CourseUrl = `https://firebasestorage.googleapis.com/v0/b/${metadataCourse.bucket}/o/course%2F${metadataCourse.name}?alt=media`

                const dbRef = ref(database, `course/${id}`)
                await set(dbRef, {
                    image: CourseUrl,
                    text,
                    link,
                    name,
                })

                return { error: null, data: true }
            }
        } catch (error: any) {
            return { data: null, error: error.message }
        }
    }


}

const courseService = new CourseService()
export default courseService