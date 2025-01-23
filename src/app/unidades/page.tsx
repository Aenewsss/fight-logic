'use client'
import Button from "@/components/button";
import { useState } from "react";

export default function Page() {
    const [location, setLocation] = useState(0);

    return (
        <main className="container mx-auto md:pt-32 pt-10 pb-10  md:px-0 px-4">
            <h1 className="md:text-[3.5rem] text-4xl font-questrial text-center mb-8">Unidades</h1>

            <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                    <Button onClick={() => setLocation(0)} className="px-5 py-2 w-52" text="Asa Norte" backgroundColor={location == 0 ? 'amber' : 'black'} />
                    <Button onClick={() => setLocation(1)} className="px-5 py-2 w-52" text="Lago Sul" backgroundColor={location == 1 ? 'amber' : 'black'} />
                </div>

                {location == 0 &&
                    <div className="flex gap-6 md:flex-nowrap flex-wrap">
                        <div className="w-full">
                            <iframe width="100%" height="600" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Fight%20logic+(Fight%20logic)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            </iframe>
                        </div>

                        <video className="h-[600px]" controls src="/unidades/asa-norte.mp4"></video>
                    </div>
                }
                {location == 1 &&
                    <div className="flex gap-6 md:flex-nowrap flex-wrap">
                        <div className="w-full"><iframe width="100%"className="md:h-full h-[600px]" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=-15.83593338090835,%20-47.83444086011914+(Fight%20logic%20Lago%20Sul)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div>

                        <div className="flex flex-col md:w-1/3 w-full gap-2">
                            <img className="md:h-[200px] h-[400px] w-full" src="/unidades/lago-sul1.jpeg" />
                            <img className="md:h-[200px] h-[400px] w-full" src="/unidades/lago-sul2.jpeg" />
                            <img className="md:h-[200px] h-[400px] w-full" src="/unidades/lago-sul3.jpeg" />
                        </div>
                    </div>
                }
            </div>

        </main>

    )
}