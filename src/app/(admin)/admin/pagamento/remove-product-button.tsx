'use client'

import paymentService from "@/services/payment.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface IProps {
    id: string
}

export default function RemoveProductButton({ id }: IProps) {
    const router = useRouter()
    
    async function removeProduct() {
        paymentService.deleteProduct(id)
            .then(_ => {
                toast('Produto removido', { type: "success" });
                router.push('/admin/pagamento')
            })
            .catch(e => {
                toast(e.message, { type: "error" });
            })
    }

    return (
        <button onClick={removeProduct} className="text-center text-red-500 hover:scale-110 font-semibold cursor-pointer">X</button>
    )
}