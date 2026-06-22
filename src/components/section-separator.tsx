import { cn } from "@/lib/utils";

type SectionColor = "black" | "yellow" | "blackLight" | "transparent";

type SectionSeparatorProps = {
  /** Cor da seção que vem abaixo do separador */
  to: "black" | "yellow" | "blackLight";
  /** Cor da seção acima — padrão: preto ao ir para amarelo, amarelo ao ir para preto */
  from?: SectionColor;
  className?: string;
};

const colorClass: Record<Exclude<SectionColor, "transparent">, string> = {
  black: "bg-black",
  yellow: "bg-yellow-base",
  blackLight: "bg-blackLight",
};

export function SectionSeparator({ to, from, className }: SectionSeparatorProps) {
  const resolvedFrom: SectionColor =
    from ?? (to === "yellow" ? "black" : to === "blackLight" ? "black" : "yellow");

  const fillClass = to === "yellow" ? colorClass.yellow : to === "blackLight" ? colorClass.blackLight : colorClass.black;
  const baseClass =
    resolvedFrom === "transparent"
      ? undefined
      : colorClass[resolvedFrom];

  return (
    <div
      aria-hidden
      className={cn(
        "relative w-full shrink-0",
        "h-10 sm:h-12 md:h-14 lg:h-[3.8125rem]",
        baseClass,
        className,
      )}
    >
      <div
        className={cn("absolute inset-0", fillClass)}
        style={{
          clipPath: "polygon(150px 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}
