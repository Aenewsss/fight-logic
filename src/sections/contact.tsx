import Reveal from "@/app/hooks/Reveal";
import ContactForm from "@/components/contact-form";

export default function Contact() {
    return (
        <section className="relative flex justify-center md:min-h-[600px] min-h-[700px]">
            <div id="contato" className="container mx-auto absolute md:-top-32 -top-10 rounded-[40px] shadow-md shadow-slate-400 md:p-16 p-4 bg-white">
                <div className="flex gap-8 md:flex-nowrap flex-wrap">
                    <div className="flex flex-col gap-4 md:w-3/4">
                        <Reveal animation="to-top">
                            <h3 className="font-questrial md:text-5xl text-4xl">Entre em contato</h3>
                        </Reveal>
                        <p className="font-inter">Venha nos fazer uma visita e conhecer nossa academia</p>
                        <Reveal animation="opacity">
                            <ContactForm />
                        </Reveal>
                    </div>
                    <div className="w-full md:flex hidden">
                        <iframe width="100%" height="440" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src=<div style="width: 100%"><iframe width="100%" height="440" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=440&amp;hl=en&amp;q=15%C2%B044'36.8%22S%2047%C2%B053'42.3%22W+(Constrictor%20Team%20Asa%20Norte)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        </iframe>
                    </div>
                    <div className="w-full md:hidden rounded-md overflow-hidden">
                        <iframe width="100%" height="220" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src=<div style="width: 100%"><iframe width="100%" height="440" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=440&amp;hl=en&amp;q=15%C2%B044'36.8%22S%2047%C2%B053'42.3%22W+(Constrictor%20Team%20Asa%20Norte)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}