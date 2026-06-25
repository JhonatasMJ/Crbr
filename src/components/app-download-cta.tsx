import humanImage from "@/assets/humanHand.png";
import { cn } from "@/lib/utils";
import { AppleLogoIcon, GooglePlayLogoIcon } from "@phosphor-icons/react";

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
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
          <div>
            <h3 className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl">
              Baixe o app CRBR
            </h3>
            <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-black/65 font-semibold">
              Instale na App Store ou Google Play e comece a investir em poucos
              minutos.
            </p>
          </div>

          <StoreButtons />
        </div>

        <img
          src={humanImage}
          alt="Pessoa usando o aplicativo CRBR"
          className="absolute -bottom-1 -right-1 z-0 max-h-[200px] w-auto object-contain object-bottom sm:max-h-[320px]"
        />
      </div>
    );
  }

  return (
    <div  className={cn("rounded-md bg-yellow-base", className)}>
      <div className="grid grid-cols-1 items-end gap-6 p-6 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-4">
          <h3 className="max-w-md text-2xl font-bold text-black sm:text-3xl">
            Leve a CRBR no bolso e invista de qualquer lugar.
          </h3>
          <p className="max-w-md text-sm text-black/70 sm:text-base">
            Baixe o app, acompanhe sua carteira e tenha suporte sempre que
            precisar.
          </p>
          <StoreButtons />
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={humanImage}
            alt="Pessoa usando o aplicativo CRBR"
            className="max-h-[180px] w-auto object-contain object-bottom sm:max-h-[220px] lg:max-h-[240px]"
          />
        </div>
      </div>
    </div>
  );
}
