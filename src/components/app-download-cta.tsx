import humanImage from "@/assets/humanHand.png";
import { cn } from "@/lib/utils";
import {
  AppleLogoIcon,
  ClockIcon,
  DeviceMobileIcon,
  GooglePlayLogoIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";

const PANEL_FEATURES = [
  { icon: ShieldCheckIcon, text: "Ambiente seguro e confiável" },
  { icon: ClockIcon, text: "Cadastro em poucos minutos" },
  { icon: DeviceMobileIcon, text: "Investir direto do celular" },
] as const;

function StoreButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        className="rounded-md bg-black px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90 flex items-center gap-2"
        href="https://apps.apple.com/br/app/crbr-investimentos/id6746351035"
        target="_blank"
      >
        <AppleLogoIcon weight="fill" size={18} />
        App Store
      </a>
      <a
        className="rounded-md bg-black px-8 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90 flex items-center gap-2"
        href="https://play.google.com/store/apps/details?id=br.tribustec.Crbr&hl=pt_BR"
        target="_blank"
      >
        <GooglePlayLogoIcon weight="fill" size={18} />
        Google Play
      </a>
    </div>
  );
}

type AppDownloadCtaProps = {
  variant?: "full" | "panel";
  className?: string;
};

export function AppDownloadCta({
  variant = "full",
  className,
}: AppDownloadCtaProps) {
  if (variant === "panel") {
    return (
      <div
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden rounded-md bg-yellow-base",
          className,
        )}
      >
        <div className="relative z-10 flex h-full flex-1 flex-col justify-center gap-5 p-6 sm:gap-6 sm:p-7">
          <div>
            <span className="inline-flex w-fit items-center rounded-md bg-black px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-yellow-base">
              Passo 01
            </span>
            <h3 className="mt-2.5 text-xl font-bold leading-tight text-black sm:mt-3 sm:text-2xl">
              Baixe o app CRBR
            </h3>
            <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-black/65 font-semibold">
              Instale na App Store ou Google Play e comece a investir em poucos
              minutos.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {PANEL_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-black">
                    <Icon weight="fill" size={13} className="text-yellow-base" />
                  </span>
                  <span className="text-xs font-semibold text-black/80 sm:text-sm">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <StoreButtons className="mt-2" />
        </div>

        <img
          src={humanImage}
          alt="Pessoa usando o aplicativo CRBR"
          className="absolute -bottom-1 -right-1 z-0 max-h-[140px] w-auto object-contain object-bottom sm:max-h-[320px]"
        />
      </div>
    );
  }

 
}
