import Image from "next/image";

export default function Diferentials() {
    return (
        <section className="my-8 relative">

            <div className="absolute top-0 left-0 w-full flex items-center">
                <h2 className="text-[3.5rem] z-10 text-white pl-8">Por que escolher <br />a Fight Logic?</h2>
                <Image className="absolute" src="/blob.svg" width={500} height={500} alt="Blob"/>
            </div>
            <div className="container mx-auto">
                <div className="w-[320px]"></div>
                <div className="flex flex-col gap-4 items-center max-w-[320px]">
                    <Image src="/icons/" width={102} height={102} alt="" />
                    <h3 className="text-center">Experiência de mais de 10 anos</h3>
                    <p className="text-center">Os fundadores da F1ght Logic tem uma trajetória sólida de mais de uma década. Entendemos do mercado de lutas e nosso objetivo é oferecer serviços excepcionais que atendam às necessidades específicas de cada aluno</p>
                </div>
                <div className="flex flex-col gap-4 items-center max-w-[320px]">
                    <Image src="/icons/" width={102} height={102} alt="" />
                    <h3 className="text-center">Profissionais altamente qualificados</h3>
                    <p className="text-center">Nossos instrutores são especialistas em suas respectivas disciplinas, fornecendo treinamentos de alta qualidade e orientação técnica precisa.</p>
                </div>
                <div className="flex flex-col gap-4 items-center max-w-[320px]">
                    <Image src="/icons/" width={102} height={102} alt="" />
                    <h3 className="text-center">Escolha ideal para iniciantes</h3>
                    <p className="text-center">Nossa academia oferece um ambiente acolhedor e apoio total para que você se sinta confiante e confortável em sua jornada nas artes marciais</p>
                </div>
                <div className="flex flex-col gap-4 items-center max-w-[320px]">
                    <Image src="/icons/" width={102} height={102} alt="" />
                    <h3 className="text-center">Abordagem profissional e pedagógica</h3>
                    <p className="text-center">Nossos instrutores são treinados para adaptar suas metodologias de ensino às necessidades individuais de cada aluno, garantindo uma experiência de aprendizado apropriada e eficiente.
                    </p>
                </div>
                <div className="flex flex-col gap-4 items-center max-w-[320px]">
                    <Image src="/icons/" width={102} height={102} alt="" />
                    <h3 className="text-center">Trabalho com crianças e mulheres</h3>
                    <p className="text-center">Oferecemos um ambiente inclusivo e seguro para crianças e mulheres. Acreditamos na importância de incentivar a participação de todos.</p>
                </div>
                <div className="flex flex-col gap-4 items-center max-w-[320px]">
                    <Image src="/icons/" width={102} height={102} alt="" />
                    <h3 className="text-center">Foco em família</h3>
                    <p className="text-center">Acreditamos que a união familiar é fundamental para uma experiência enriquecedora. Valorizamos o Jiu-Jitsu como um esporte que promove a união familia</p>
                </div>
            </div>
        </section>
    )
}