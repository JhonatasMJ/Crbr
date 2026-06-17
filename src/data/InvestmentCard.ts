;
import { MoneyWavyIcon, SealQuestionIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export const cardData: { title: string, description: string, icon: Icon }[] = [
    {
        title: "O que é renda fixa?",
        description: "É um investimento onde o investidor empresta dinheiro e recebe uma remuneração fixa ao longo do tempo, proporcionando estabilidade e segurança financeira.",
        icon: SealQuestionIcon,
    },
    {
        title: "Por que investir?",
        description: "A plataforma exclusiva da CRBR simplifica investimentos em Renda Fixa, oferecendo autonomia e gestão transparente via computador ou celular",
        icon: MoneyWavyIcon,
    },
    {
        title: "Benefícios renda fixa ",
        description: "A Renda Fixa oferece mais previsibilidade, segurança e estabilidade para quem deseja investir com confiança, acompanhando seus rendimentos de forma simples e transparente.",
        icon: ThumbsUpIcon,
    },
]
