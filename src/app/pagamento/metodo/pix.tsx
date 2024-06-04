'use client'
import Image from "next/image";
import { useRef, useState } from "react";

export default function Pix({ setShowPixModal }: any) {

    const spanRef = useRef<HTMLSpanElement>(null)

    const [copied, setCopied] = useState(false);

    function copyPix() {
        const pix = spanRef.current.textContent
        navigator.clipboard.writeText(pix)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000);
    }

    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen flex justify-center items-center animation-opacity">
            <div className="flex flex-col gap-8 absolute z-20 text-white items-center max-w-[600px] text-center md:px-0 px-4">
                <Image className="animation-to-top animation-delay-1" src="/pix.jpeg" width={300} height={300} alt="QR code pix" />
                <span className="break-all animation-to-top animation-delay-2" ref={spanRef}>00020126580014br.gov.bcb.pix0136c8d655d0-96e9-4522-b98d-f300378c6cbb5204000053039865802BR5925INSTITUTO SEMPRE ENFRENTE6008BRASILIA622605224RzjcyySvNeKNLRTRIhMMh630416B7</span>
                <button onClick={copyPix} className="animation-to-top animation-delay-3 bg-blue-500 px-3 py-2 rounded transition-all hover:text-lg">{!copied ? 'Copiar chave pix' : 'Chave pix copiada'}</button>
                <span className="mt-2 text-white text-sm">*Envie o comprovante em nosso WhatsApp</span>
            </div>

            <p onClick={_ => setShowPixModal(false)} className="absolute top-10 right-10 z-20 text-white cursor-pointer transition-all hover:scale-105">X Fechar</p>

            <div className="bg-black w-screen h-screen opacity-90"></div>
        </div>

    )
}