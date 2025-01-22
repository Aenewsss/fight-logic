import planService from "@/services/plan.service"

export async function preMatricula(state: any, form: FormData) {
    const { data } = await planService.getPlans()
    const index = Number(form.get('modality'))

    const plan = data[index]

    form.append('plan', plan.name)
    form.append('link', plan?.subscriptions[0].link)
    
    return (await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/pre-matricula`, { method: "POST", cache: 'no-cache', body: form })).json()
}
