import type { ReactNode } from "react";
import print1 from "@/assets/app/print1.svg";
import print2 from "@/assets/app/print2.svg";
import humanImage from "@/assets/humanApp.png";
import humanImage2 from "@/assets/humanHand.png";
import { cn } from "@/lib/utils";

type PhoneBentoCardProps = {
  title: ReactNode;
  description: string;
  image: string;
  className?: string;
};

function PhoneBentoCard({
  title,
  description,
  image,
  className,
}: PhoneBentoCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-blackLight pt-4 text-center",
        "lg:flex lg:h-[90%] lg:flex-col",
        className,
      )}
    >
      <div className="shrink-0 px-4 mt-2">
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        <p className="mx-auto mt-4 mb-12 max-w-1/2 text-sm text-white/90 sm:text-base">
          {description}
        </p>
      </div>

      <div className="mt-3 flex items-end justify-center  lg:mt-0 lg:min-h-0 lg:flex-1">
        <img
          src={image}
          alt=""
          className="h-auto w-full object-contain object-bottom lg:max-h-full lg:w-full"
        />
      </div>
    </div>
  );
}

type SplitBentoCardProps = {
  title: ReactNode;
  description: string;
  image: string;
  className?: string;
};

function SplitBentoCard({
  title,
  description,
  image,
  className,
}: SplitBentoCardProps) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-2xl bg-blackLight sm:grid-cols-2 pt-4",
        className,
      )}
    >
      <div className="flex flex-col justify-center px-5 py-4 text-left">
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-white/90 sm:text-base">{description}</p>
      </div>

      <div className="flex items-end justify-center">
        <img
          src={image}
          alt=""
          className="h-auto w-full object-contain object-bottom"
        />
      </div>
    </div>
  );
}

export function AppBentoGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[auto_auto] lg:items-stretch">
      <PhoneBentoCard
        className="lg:row-span-2"
        image={print1}
        title={
          <>
            Crie sua <span className="text-yellow-base">conta</span>.
          </>
        }
        description="Abra sua conta e inicie sua jornada financeira com a gente."
      />

      <SplitBentoCard
        className="lg:col-start-2 lg:row-start-1"
        image={print2}
        title={
          <>
            Gerencie seu <span className="text-yellow-base">investimento.</span>
          </>
        }
        description="Acompanhe seu patrimônio, consulte históricos e acesse seus comprovantes quando precisar."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-start-2 lg:row-start-2 lg:h-[90%]">
        <div className="flex items-end justify-center h-[90%]  rounded-2xl bg-yellow-base sm:min-h-[200px] relative">
          <img
            src={humanImage2}
            alt="Consultor CRBR"
            className=" w-[80%] object-contain object-bottom absolute bottom-0 "
          />
        </div>

        <div className="flex h-[90%] min-h-[180px] flex-col overflow-hidden rounded-2xl bg-blackLight px-4 pt-4 text-left sm:min-h-[200px]">
          <div className="shrink-0">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Baixe <span className="text-yellow-base">Agora.</span>
            </h2>
            <p className="mt-2 text-sm text-white/90">
              Disponível nas lojas oficiais para iOS e Android.
            </p>
          </div>

          <div className="flex flex-1 items-end justify-end">
            <img
              src={humanImage}
              alt="Baixe o aplicativo CRBR"
              className="h-auto max-h-full w-[60%] object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
