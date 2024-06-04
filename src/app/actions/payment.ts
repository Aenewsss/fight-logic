'use server'
import paymentService from "@/services/payment.service";

export async function updateProduct(state: any, form: FormData) {
    const id = form.get('id').toString()

    return await paymentService.updateProduct(id, form)
}

export async function createProduct(state: any, form: FormData) {
    return await paymentService.createProduct(form)
}
