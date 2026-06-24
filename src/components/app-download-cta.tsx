import humanImage from "@/assets/humanApp.png";
import { cn } from "@/lib/utils";

function StoreButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        type="button"
        className="rounded-md bg-black px-4 py-2.5 text-xs font-bold text-yellow-base transition-opacity hover:opacity-90"
      >
        App Store
      </button>
      <button
        type="button"
        className="rounded-md border border-black/20 bg-black/5 px-4 py-2.5 text-xs font-bold text-black transition-colors hover:bg-black hover:text-yellow-base"
      >
        Google Play
      </button>
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
          "flex h-full w-full flex-col rounded-md bg-yellow-base p-6 sm:p-7",
          className,
        )}
      >
        <div className="flex flex-1 flex-col justify-between gap-6">
          <div>
      
            <h3 className="mt-2 text-xl font-bold leading-tight text-black sm:text-2xl">
              Baixe o app CRBR
            </h3>
            <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-black/65">
              Instale na App Store ou Google Play e comece a investir em poucos
              minutos.
            </p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <StoreButtons />
            <img
              src={humanImage}
              alt="Pessoa usando o aplicativo CRBR"
              className="max-h-[200px] w-auto shrink-0 object-contain object-bottom sm:max-h-[220px]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-md bg-yellow-base", className)}>
      <div className="grid grid-cols-1 items-end gap-6 p-6 sm:gap-8 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
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
