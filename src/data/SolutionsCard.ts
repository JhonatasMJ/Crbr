;
import { MoneyWavyIcon, SealQuestionIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export const solutionsData: { title: string, description: string, icon: Icon }[] = [
    {
        title: "Empréstimos",
        description: "Soluções de crédito rápidas e adequadas às suas necessidades.",
        icon: SealQuestionIcon,
    },
    {
        title: "Seguros",
        description: "Proteja seu patrimônio e tenha mais tranquilidade no dia a dia.",
        icon: MoneyWavyIcon,
    },
    {
        title: "Consórcios",
        description: "Planeje suas finanças e realize suas conquistas.",
        icon: ThumbsUpIcon,
    },
]
