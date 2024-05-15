'use client'
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { IStripeProductEdit } from "@/interfaces";
import { updateProduct } from "@/app/actions/payment";
import { ProductButton } from "./product-button";
import paymentService from "@/services/payment.service";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    id: string
}

export default function ProductForm({ id }: IProps) {
    const router = useRouter()

    const [state, action] = useFormState(updateProduct, undefined)
    const [product, setProduct] = useState<IStripeProductEdit>();
    const [newImage, setNewImage] = useState('');

    useEffect(() => {
        async function getData() {
            const { data } = await paymentService.getProductByPriceId(id)
            console.log(data)
            setProduct(data)
        }
        getData()
    }, [id]);

    useEffect(() => {
        if (state?.error) toast(state.error, { type: "error" });
        if (state?.data) {
            toast('Produto atualizado', { type: "success" });
            setTimeout(() => {
                router.push('/admin/pagamento')
            }, 2000);
        }
    }, [state]);

    function handleImage(e: any) {
        e.preventDefault()
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setNewImage(url)
    }

    if (!product) return <p>Carregando</p>

    return (
        <form action={action} className="w-full mt-8 bg-white shadow-md shadow-black p-8 flex flex-col gap-4 items-start">
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Plano</label>
                <input placeholder="Nome do aluno" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} className="px-4 border rounded py-2" id="name" type="text" name="name" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="recurring">Recorrência</label>
                <select className="px-4 border rounded py-2 cursor-pointer" value={product.recurring} onChange={e => setProduct({ ...product, recurring: e.target.value })} name="recurring" id="recurring">
                    <option value="year">Anual</option>
                    <option value="monthly">Mensal</option>
                    <option value="semi-annual">Semestral</option>
                </select>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="text">Valor</label>
                <input type="text" value={product.monthly} onChange={e => setProduct({ ...product, monthly: e.target.value })} className="px-4 border rounded py-2" id="price" name="price" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="description">Imagem</label>
                {product.image || newImage
                    ? <Image className="max-h-[500px] object-contain" unoptimized src={newImage || product.image} width={300} height={300} alt="Imagem do pagamento" />
                    : <p>Carregando</p>
                }
                <label className="hover:bg-white hover:text-blue-500 hover:border-blue-500 border cursor-pointer rounded flex self-start bg-blue-500 text-white px-3 py-2" htmlFor="file">
                    Alterar Foto
                </label>
                <input onChange={handleImage} name="file" id="file" className="opacity-0" type="file" accept="image/*" />
            </div>
            <input name="id" defaultValue={product.priceId} hidden type="text" />

            <div className="border-t pt-2 flex justify-end w-full gap-2">
                <Link className="bg-gray-300 px-2 py-2 rounded-md" href="/admin/pagamento">Cancelar</Link>
                <ProductButton />
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </form>
    )
}