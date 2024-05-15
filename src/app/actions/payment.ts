'use server'
import paymentService from "@/services/payment.service";

export async function paymentBasicData(state: any, form: FormData) {
    const modality = form.get('modality').toString()
    const email = form.get('email').toString()
    return await paymentService.getPaymentSession(modality, email)
}

export async function updateProduct(state: any, form: FormData) {
    const id = form.get('id').toString()

    return await paymentService.updateProduct(id, form)
}