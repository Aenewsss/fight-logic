import { RecurringEnum } from "@/interfaces"
import paymentService from "@/services/payment.service"
import planService from "@/services/plan.service"

export async function insertPlan(state: any, form: FormData) {
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!
    const price = form.get("price")?.toString()!

    let arrComplete = Array.from({ length: 3 }).fill(null).map((_, index) => {
        index += 1
        const recurring = form.get(`recurring-${index}`)
        const price = form.get(`price-${index}`)
        const link = form.get(`link-${index}`)

        return [recurring, price, link].filter(Boolean).length == 3 ? true : false
    })

    if (arrComplete.every(el => !el)) return { error: 'Preenchimento incompleto', data: null }

    const subscriptionsIndex = arrComplete.map((el, index) => el && index + 1).filter(Boolean)

    const subscriptionsToAdd = subscriptionsIndex.map(el => ({
        recurring: form.get(`recurring-${el}`),
        price: form.get(`price-${el}`),
        link: form.get(`link-${el}`)
    }))

    return await planService.insertPlan(text, name, price, subscriptionsToAdd)
}

export async function updatePlan(state: any, form: FormData) {
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!
    const recurring = form.getAll("recurring").map(el => el.toString()) as RecurringEnum[]
    const id = form.get("id")?.toString()!

    const recurringData = recurring.map(type => {
        const installments = form.get(`installments-${type}`);
        const price = form.get(`price-${type}`);

        if (!installments && !price) {
            return null;
        }

        return {
            type,
            installments: installments ? Number(installments.toString()) : 0,
            price: price ? Number(price.toString()) : 0
        };
    }).filter(Boolean);

    recurringData.map(async el => await paymentService.createPrice(name, el.installments, el.price, el.type))

    return await planService.updatePlan(id, text, name, recurringData)
}