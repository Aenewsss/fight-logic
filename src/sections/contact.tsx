import ContactForm from "@/components/contact-form";

export default function Contact() {
    return (
        <section className="relative flex justify-center min-h-[600px]">
            <div className="container mx-auto absolute -top-32 rounded-[40px] shadow-md shadow-slate-400 p-16" style={{ background: 'linear-gradient(to right,#FFF 0%, #fff 70%, #6DE1C2 0%, #6DE1C2 30%', }}>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-4 w-3/4">
                        <h3 className="font-questrial text-5xl">Entre em contato</h3>
                        <p className="font-inter">Venha nos fazer uma visita e conhecer nossa academia</p>
                        <ContactForm />
                    </div>
                    <div className="w-full">
                        <iframe width="100%" height="440" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=440&amp;hl=en&amp;q=Constrictor%20Parque%20da%20Cidade+(Fight%20Logic)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}