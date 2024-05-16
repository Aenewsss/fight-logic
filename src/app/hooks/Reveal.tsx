import { ReactNode, useEffect, useRef } from "react";

export default function Reveal({children}: {children:ReactNode}) {
    const ref = useRef(null)

    // useEffect(() => {
    //     console.log(ref.current)
    // }, []);
    
    return (
        <div ref={ref}>
            {children}
        </div>
    )
}