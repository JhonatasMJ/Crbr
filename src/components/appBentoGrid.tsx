import print1 from "@/assets/app/print1.svg";
import print2 from "@/assets/app/print2.svg";
import humanImage from "@/assets/humanApp.png";
import humanImage2 from "@/assets/humanHand.png";
import { GsapRevealGroup } from "@/components/gsap-reveal";
import { cn } from "@/lib/utils";

type CardVariant = "standard" | "split" | "image-only" | "download";

type BentoCardConfig = {
  id: string;
  variant: CardVariant;
  title?: string;
  highlight?: string;
  description?: string;
  image: string;
  imageAlt: string;
  className: string;
};

type BentoCardProps = {
  card: BentoCardConfig;
};

const bentoCards: BentoCardConfig[] = [
  {
    id: "create-account",
    variant: "standard",
    title: "Crie sua",
    highlight: "conta",
    description: "Abra sua conta e inicie sua jornada financeira com a gente.",
    image: print1,
    imageAlt: "Tela de cadastro do aplicativo",
    className: "lg:col-span-3 lg:col-start-1 lg:row-span-2 lg:row-start-1",
  },
  {
    id: "manage-investment",
    variant: "split",
    title: "Gerencie seu",
    highlight: "investimento",
    description:
      "Acompanhe seus investimentos e rendimentos em tempo real.",
    image: print2,
    imageAlt: "Dashboard do aplicativo",
    className: "lg:col-span-6 lg:col-start-4 lg:row-start-1",
  },
  {
    id: "app-screen",
    variant: "standard",
    title: "Acompanhe",
    highlight: "tudo",
    description: "Controle carteira, extratos e performance no mesmo app.",
    image: print2,
    imageAlt: "Tela principal do aplicativo",
    className: "lg:col-span-3 lg:col-start-10 lg:row-start-1",
  },
  {
    id: "advisor-pointing",
    variant: "image-only",
    image: humanImage2,
    imageAlt: "Pessoa apontando para o aplicativo",
    className: "lg:col-span-4 lg:col-start-4 lg:row-start-2",
  },
  {
    id: "download-now",
    variant: "download",
    title: "Baixe",
    highlight: "Agora",
    description: "Tenha sua conta na palma da mão com rapidez e segurança.",
    image: humanImage,
    imageAlt: "Pessoa segurando celular",
    className: "lg:col-span-5 lg:col-start-8 lg:row-start-2",
  },
];

function BentoTitle({ title, highlight }: { title?: string; highlight?: string }) {
  if (!title && !highlight) return null;

  return (
    <h3 className="text-xl font-bold text-white sm:text-2xl">
      {title} {highlight && <span className="text-[#FFC107]">{highlight}</span>}
      .
    </h3>
  );
}

function StoreButtons() {
  return (
    <div className="mt-4 flex flex-col gap-2.5">
      <button
        type="button"
        className="w-fit rounded-xl bg-[#FFC107] px-4 py-2 text-xs font-bold text-black transition-opacity hover:opacity-90"
      >
        Play Store
      </button>
      <button
        type="button"
        className="w-fit rounded-xl bg-white px-4 py-2 text-xs font-bold text-black transition-opacity hover:opacity-90"
      >
        App Store
      </button>
    </div>
  );
}

function BentoCard({ card }: BentoCardProps) {
  const baseCardClass =
    "relative overflow-hidden rounded-md bg-blackLight";

  if (card.variant === "image-only") {
    return (
      <article
        className={cn(
          baseCardClass,
          "gsap-reveal-item flex min-h-[190px] items-end justify-center bg-yellow-base",
          card.className,
        )}
      >
        <img
          src={card.image}
          alt={card.imageAlt}
          className="h-full max-h-[300px] w-auto object-contain  relative z-10 bottom-0"
        />
      </article>
    );
  }

  if (card.variant === "split") {
    return (
      <article className={cn(baseCardClass, "gsap-reveal-item grid min-h-[190px] sm:grid-cols-2", card.className)}>
        <div className="flex flex-col justify-center px-5 py-5 text-left">
          <BentoTitle title={card.title} highlight={card.highlight} />
          <p className="mt-2.5 text-sm text-white/85 sm:text-base">{card.description}</p>
        </div>

        <div className="relative flex items-end justify-end p-2 sm:p-0">
          <img
            src={card.image}
            alt={card.imageAlt}
            className="relative z-10 h-auto w-[86%] object-contain object-bottom"
          />
        </div>
      </article>
    );
  }

  if (card.variant === "download") {
    return (
      <article className={cn(baseCardClass, "gsap-reveal-item grid min-h-[190px] grid-cols-[1fr_auto]", card.className)}>
        <div className="px-5 py-5 text-left">
          <BentoTitle title={card.title} highlight={card.highlight} />
          <p className="mt-2 text-sm text-white/85">{card.description}</p>
          <StoreButtons />
        </div>

        <div className="relative flex items-end justify-end pr-2">
          <img
            src={card.image}
            alt={card.imageAlt}
            className="relative z-10 h-full max-h-[260px] w-auto object-contain object-bottom"
          />
        </div>
      </article>
    );
  }

  const isTallCard = card.id === "create-account";

  if (isTallCard) {
    return (
      <article
        className={cn(
          baseCardClass,
          "gsap-reveal-item flex h-full min-h-0 flex-col",
          card.className,
        )}
      >
        <div className="shrink-0 px-4 pb-1 pt-4 text-center">
          <BentoTitle title={card.title} highlight={card.highlight} />
          <p className="mx-auto mt-1.5 max-w-[90%] text-sm text-white/85">
            {card.description}
          </p>
        </div>

        <div className="relative min-h-0 flex-1">
          <img
            src={card.image}
            alt={card.imageAlt}
            className="absolute bottom-0 left-1/2 h-full w-[96%] -translate-x-1/2 object-contain object-bottom"
          />
        </div>
      </article>
    );
  }

  return (
    <article className={cn(baseCardClass, "gsap-reveal-item flex min-h-[190px] flex-col", card.className)}>
      <div className="px-5 pt-5 text-center">
        <BentoTitle title={card.title} highlight={card.highlight} />
        <p className="mx-auto mt-2 max-w-[90%] text-sm text-white/85">{card.description}</p>
      </div>

      <div className="mt-2 flex items-end justify-center px-2">
        <img
          src={card.image}
          alt={card.imageAlt}
          className="h-auto w-[92%] object-contain object-bottom"
        />
      </div>
    </article>
  );
}

export function AppBentoGrid() {
  return (
    <GsapRevealGroup
      className="mx-auto w-full max-w-[1440px]"
      variant="scale-up"
      stagger={0.1}
      itemClassName="gsap-reveal-item"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:items-stretch">
        {bentoCards.map((card) => (
          <BentoCard key={card.id} card={card} />
        ))}
      </div>
    </GsapRevealGroup>
  );
}
