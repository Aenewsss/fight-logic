import ContactForm from "@/components/contact-form";

export default function Contact() {
    return (
        <section className="relative flex justify-center md:min-h-[600px] min-h-[800px]">
            <div id="contato" className="container mx-auto absolute md:-top-32 -top-10 rounded-[40px] shadow-md shadow-slate-400 md:p-16 p-4" style={{ background: 'linear-gradient(to right,#FFF 0%, #fff 70%, #6DE1C2 0%, #6DE1C2 30%', }}>
                <div className="flex gap-8 md:flex-nowrap flex-wrap">
                    <div className="flex flex-col gap-4 md:w-3/4">
                        <h3 className="font-questrial md:text-5xl text-4xl">Entre em contato</h3>
                        <p className="font-inter">Venha nos fazer uma visita e conhecer nossa academia</p>
                        <ContactForm />
                    </div>
                    <div className="w-full md:flex hidden">
                        <iframe width="100%" height="440" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=440&amp;hl=en&amp;q=Constrictor%20Parque%20da%20Cidade+(Fight%20Logic)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        </iframe>
                    </div>
                    <div className="w-full md:hidden rounded-md overflow-hidden">
                        <iframe width="100%" height="220" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=220&amp;hl=en&amp;q=Constrictor%20Parque%20da%20Cidade+(Fight%20Logic)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}