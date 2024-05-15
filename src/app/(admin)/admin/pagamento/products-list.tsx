import { IStripeProducts } from "@/interfaces"
import paymentService from "@/services/payment.service"
import Image from "next/image"
import Link from "next/link"
import RemoveProductButton from "./remove-product-button"

export default async function ProductsList() {
    const { data }: { data: IStripeProducts[] } = await paymentService.getProducts()

    return (
        <ul className="list-none my-4 bg-white p-4 shadow-md shadow-black w-full">
            {data.map((el, index) =>
                <li key={index} className="flex justify-between">
                    <span>{el.name} - 12x de R${el.monthly}</span>
                    <Link href={`/admin/pagamento/${el.priceId}`} className="group">
                        <Image src="/icons/pencil.svg" width={20} height={20} alt="Lápis de edição" className="group-hover:scale-110" />
                    </Link>
                    <RemoveProductButton id={el.priceId} />
                </li>
            )}
        </ul>
    )
}