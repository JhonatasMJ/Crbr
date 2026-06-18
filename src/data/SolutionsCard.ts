;
import { MoneyWavyIcon, SealCheckIcon, SealQuestionIcon, ShieldStarIcon, ThumbsUpIcon, UserSwitchIcon } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export const solutionsData: { title: string, description: string, icon: Icon, whatsAppMessage: string }[] = [
    {
        title: "Empréstimos",
        description: "Soluções de crédito rápidas e adequadas às suas necessidades.",
        icon: SealQuestionIcon,
        whatsAppMessage: "Olá, vi seu site e gostaria de saber mais sobre os empréstimos.",
    },
    {
        title: "Seguros",
        description: "Proteja seu patrimônio e tenha mais tranquilidade no dia a dia.",
        icon: MoneyWavyIcon,
        whatsAppMessage: "Olá, vi seu site e gostaria de saber mais sobre os seguros.",
    },
    {
        title: "Consórcios",
        description: "Planeje suas finanças e realize suas conquistas.",
        icon: ThumbsUpIcon,
        whatsAppMessage: "Olá, vi seu site e gostaria de saber mais sobre os consórcios.",
    },
]



export const solutionsSpanData: { description: string, icon: Icon }[] = [
    {
        description: "Segurança em cada escolha",
        icon: ShieldStarIcon,
    },
    {
        description: "As Melhores condições",
        icon: SealCheckIcon,
    },
    {
        description: "Atendimento humanizado",
        icon: UserSwitchIcon,
    },
]
