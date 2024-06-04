import { RecurringEnum } from "@/interfaces"
import paymentService from "@/services/payment.service"
import planService from "@/services/plan.service"

export async function insertPlan(state: any, form: FormData) {
    const text = form.get("text")?.toString()!
    const name = form.get("name")?.toString()!
    const recurring = form.getAll("recurring").map(el => el.toString()) as RecurringEnum[]

    if (recurring.length == 0) return { error: 'Selecione pelo menos uma recorrência', data: null }
    if (Boolean(recurring.find(el => el == RecurringEnum.unique)) && Boolean(recurring.find(el => el != RecurringEnum.unique))) return { error: 'Recorrência única não pode ser selecionada com outros tipos de recorrência', data: null }


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

    return await planService.insertPlan(text, name, recurringData)
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