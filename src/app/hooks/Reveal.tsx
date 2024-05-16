'use client'
import { ReactNode, useEffect, useRef } from "react";

export default function Reveal({ children, animation }: { children: ReactNode, animation: "to-right" | "to-left" | "to-bottom" | "to-top" | "opacity" }) {
    const ref = useRef(null)

    useEffect(() => {
        const handleScrollListener = () => {
            if (!ref.current) return;

            const elementRect = ref.current.getBoundingClientRect();
            const isVisible =
                elementRect.top >= 0 &&
                elementRect.bottom <= window.innerHeight - 10;

            if (isVisible) {
                ref.current.classList.add(`animation-${animation}`)
            }
        }

        window.addEventListener('scroll', handleScrollListener);

        return () => window.removeEventListener('scroll', handleScrollListener);
    }, []);

    return (
        <div ref={ref} className="opacity-0">
            {children}
        </div>
    )
}