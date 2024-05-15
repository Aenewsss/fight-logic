'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { IStripeProductEdit } from "@/interfaces";
import { createProduct } from "@/app/actions/payment";
import { ProductButton } from "./product-button";
import Link from "next/link";

export default function ProductForm() {
    const router = useRouter()

    const [state, action] = useFormState(createProduct, undefined)
    const [product, setProduct] = useState<IStripeProductEdit>();

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Produto criado', { type: "success" });
            setTimeout(() => {
                router.push('/admin/pagamento')
            }, 2000);
        }
    }, [state]);



    return (
        <form action={action} className="w-full mt-8 bg-white shadow-md shadow-black p-8 flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Plano</label>
                <input placeholder="Nome do aluno" onChange={e => setProduct({ ...product, name: e.target.value })} className="px-4 border rounded py-2" id="name" type="text" name="name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="recurring">Recorrência</label>
                <select className="px-4 border rounded py-2 cursor-pointer" onChange={e => setProduct({ ...product, recurring: e.target.value })} name="recurring" id="recurring">
                    <option value="year">Anual</option>
                    <option value="month">Mensal</option>
                </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Valor</label>
                <input type="text" onChange={e => setProduct({ ...product, monthly: e.target.value })} className="px-4 border rounded py-2" id="price" name="price" />
            </div>

            <div className="border-t pt-2 flex justify-end w-full gap-2">
                <Link className="bg-gray-300 px-2 py-2 rounded-md" href="/admin/pagamento">Cancelar</Link>
                <ProductButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}