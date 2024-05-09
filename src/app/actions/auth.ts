import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { redirect } from "next/navigation"

export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirm-password'),
    })

    if (!validatedFields.success) {
        const { fieldErrors, formErrors } = validatedFields.error.flatten()

        return {
            errors: Object.keys(fieldErrors).length
                ? fieldErrors
                : { ...fieldErrors, password: formErrors }
        }
    }

    const { email, password } = validatedFields.data

    try {
        await createUserWithEmailAndPassword(auth, email, password)
        redirect('/admin')
    } catch (e) {
        return { errors: { password: ['Essa conta já está sendo usada'], email: [''], confirmPassword: [''] } }
    }
}

export async function signin(state: any, formData: FormData) {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!email || !password) return { error: 'E-mail ou senha incorretos' }

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        console.log(user.uid)
        redirect('/admin')
    } catch (e) {
        return { error: 'E-mail ou senha incorretos' }
    }
}