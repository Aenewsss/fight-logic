import Image from "next/image"
import Link from "next/link"

type TLink = 'diferenciais' | 'sobre-nos' | 'feedbacks' |
    'horarios' | 'pagamento' | 'banner' | 'equipes-parceiras' |
    'aula-particular' | 'competicoes' | 'planos' | 'cursos'

interface IProps {
    title: string
    description: string
    image: string
    link: TLink
}

export default function Card({ title, image, description, link }: IProps) {
    return (
        <Link href={'/admin/' + link} className="group flex flex-col gap-2 max-w-[300px] bg-dark-gray text-white rounded-md overflow-hidden pb-4 shadow-lg shadow-black hover:scale-[1.02] transition-none">
            <Image className="group-hover:scale-105 transition-all shadow-lg h-[300px] object-cover" src={image} width={300} height={300} alt={image} />
            <div className="p-2">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-2">{description}</p>
            </div>
        </Link>
    )
}