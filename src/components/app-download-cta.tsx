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
          "relative flex w-full min-h-[380px] flex-col items-center justify-center rounded-md bg-yellow-base sm:min-h-[400px] lg:h-full lg:min-h-0 lg:items-stretch lg:overflow-hidden",
          className,
        )}
      >
        <div className="relative z-10 flex w-full max-w-[320px] flex-col gap-4 p-5 text-left sm:max-w-[340px] sm:gap-5 sm:p-6 lg:h-full lg:max-w-[58%] lg:flex-1 lg:justify-center lg:gap-6 lg:p-7">
          <div>
            <span className="inline-flex w-fit items-center rounded-md bg-black px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-yellow-base">
              Passo 01
            </span>
            <h3 className="mt-2.5 text-xl font-bold leading-tight text-black sm:text-2xl">
              Baixe o app CRBR
            </h3>
            <p className="mt-2 max-w-[280px] text-sm font-semibold leading-relaxed text-black/65">
              Instale na App Store ou Google Play e comece a investir em poucos
              minutos.
            </p>

            <ul className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:gap-3 lg:mt-8">
              {PANEL_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-black">
                    <Icon
                      weight="fill"
                      size={13}
                      className="text-yellow-base"
                    />
                  </span>
                  <span className="text-xs font-semibold text-black/80 sm:text-sm">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-2">
            <a
              className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-6 py-3.5 text-xs font-bold text-white transition-colors duration-300 hover:bg-blackLight hover:opacity-90 lg:flex-1"
              href="https://apps.apple.com/br/app/crbr-investimentos/id6746351035"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppleLogoIcon weight="fill" size={18} />
              App Store
            </a>
            <a
              className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-6 py-3.5 text-xs font-bold text-white transition-colors duration-300 hover:bg-blackLight hover:opacity-90 lg:flex-1"
              href="https://play.google.com/store/apps/details?id=br.tribustec.Crbr&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GooglePlayLogoIcon weight="fill" size={18} />
              Google Play
            </a>
          </div>
        </div>

        <img
          src={humanImage}
          alt="Pessoa usando o aplicativo CRBR"
          className="pointer-events-none absolute -bottom-1 -right-1 z-0 hidden w-auto max-h-[280px] object-contain object-bottom lg:block lg:max-h-[320px]"
        />
      </div>
    );
  }
}
