import Card from "./Card";

export default function Cards() {
    return (
        <section className="flex gap-4 flex-wrap justify-center mt-8">
            <Card link="banner" title="Banner do Topo" description="Essa seção será responsável por alterar o banner que fica no topo do site. Coloque algum vídeo ou foto chamativa e de alta qualidade" image="/cards/card-banner.jpg"/>
            <Card link="diferenciais" title="Diferenciais" description="Destaque os principais diferenciais da Fight Logic, mostrando o que nos torna únicos no mercado" image="/cards/card-diferenciais.jpg"/>
            <Card link="feedbacks" title="Feedbacks" description="Nessa seção, você poderá adicionar feedbacks dos alunos da Fight Logic" image="/cards/card-feedbacks.jpg"/>
            <Card link="equipes-parceiras" title="Equipes Parceiras" description="Apresente as empresas ou equipes parceiras da Fight Logic, reforçando nossas parcerias estratégicas" image="/cards/card-equipe.jpeg"/>
            <Card link="horarios" title="Horários e Modalidades" description=" Informe os horários de funcionamento da Fight Logic para que os alunos saibam quando podem participar das aulas" image="/cards/card-calendar.jpg"/>
            <Card link="sobre-nos" title="Sobre a Fight Logic" description="Conheça mais sobre a história, missão e equipe da Fight Logic, entendendo nossa filosofia e valores" image="/cards/card-sobre.png"/>
            <Card link="aula-particular" title="Aulas particulares" description="Entenda o motivo para fazer aulas particulares com nosso professores" image="/private/rakel.jpeg"/>
            {/* <Card link="pagamento" title="Área de Pagamentos" description="Informe os valores dos planos de assinatura da Fight Logic para que os alunos saibam as opções disponíveis" image="/cards/card-pagamento.jpg"/> */}
        </section>
    )
}