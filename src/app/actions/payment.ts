import { redirect } from "next/navigation";

export async function paymentBasicData(state:any, form:FormData) {
    redirect('/pagamento')
}