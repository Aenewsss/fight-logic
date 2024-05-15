'use client'

import paymentService from "@/services/payment.service";
import { toast } from "react-toastify";

interface IProps {
    id: string
}

export default function RemoveProductButton({ id }: IProps) {
    async function removeProduct() {
        try {
            await paymentService.deleteProduct(id)
            toast('Produto removido', { type: "success" });
        } catch (error) {
            toast(error.message, { type: "error" });
        }
    }

    return (
        <button onClick={removeProduct} className="text-center text-red-500 hover:scale-110 font-semibold cursor-pointer">X</button>
    )
}