import { PasswordIcon, ShieldCheckIcon, UsersIcon, type Icon } from "@phosphor-icons/react"

interface FaqCard {
    title: string;
    description: string;
    icon: Icon;
}


export const FaqItems = [
    {
      value: "pagamento",
      trigger: "Qual a forma de pagamento dos investimentos?",
      content:
        "Você pode receber usando  Pix ou transferência bancária, selecionando a opção adequada e inserindo os dados necessários.",
    },
    {
      value: "taxas",
      trigger: "Quais são as taxas de investimento?",
      content:
        "Atualmente, os investimentos oferecidos por nossa plataforma não possuem taxas de administração, corretagem, custódia, performance ou quaisquer outras cobranças associadas. Isso significa que você pode investir sem se preocupar com custos adicionais que possam impactar a rentabilidade dos seus investimentos.",
    },
    {
      value: "valor-minimo",
      trigger: "Qual o valor mínimo para começar investir?",
      content:
        "O valor mínimo para começar a investir em nossa plataforma é de R$ 4.000,00. Estabelecemos esse valor para garantir que nossos investidores tenham acesso a oportunidades de investimento de alta qualidade e possam maximizar os benefícios de suas aplicações.",
    },
    {
      value: "riscos",
      trigger: "Quais são os riscos do investimento?",
      content:
        "Os investimentos oferecidos em nossa plataforma são todos de renda fixa, o que significa que não há riscos associados. Investir em renda fixa proporciona segurança e previsibilidade.",
    },
    {
      value: "suporte",
      trigger: "Quais são as opções de suporte e atendimento ao cliente oferecidas?",
      content:
            "Oferecemos suporte ao cliente via WhatsApp para respostas rápidas e por email para questões detalhadas.",
    },
  ]


 export const FaqCards: FaqCard[] = [
     {
        title: "Transparência",
        description: "Informações claras sobre todos os nossos investimentos.",
        icon: ShieldCheckIcon
     },
     {
        title: "Segurança",
        description: "Seus dados e investimentos protegidos com tecnologia.",
        icon: PasswordIcon
     },
     {
        title: "Suporte Humanizado",
        description: "Nossa equipe sempre está pronta para te atender.",
        icon: UsersIcon
     }
  ]