import { useMemo, useState } from "react";
import {
  CurrencyCircleDollarIcon,
  CurrencyDollarIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ScrollStagger } from "./scroll-reveal";
const MIN_AMOUNT = 4_000;
const MAX_AMOUNT = 100_000;
const BASE_MONTHS = 4;
const YIELD_RATE_PER_BASE = 0.1;
const MONTHLY_YIELD_RATE = YIELD_RATE_PER_BASE / BASE_MONTHS;

const highlights = [
  {
    icon: TrendUpIcon,
    label: "Rentabilidade base",
    value: "10% em 4 meses",
    variant: "yellow" as const,
  },
  {
    icon: CurrencyCircleDollarIcon,
    label: "Valor mínimo",
    value: "R$ 4.000",
    variant: "dark" as const,
  },
] as const;

const DURATION_OPTIONS = [
  { label: "4 meses", months: 4 },
  { label: "8 meses", months: 8 },
  { label: "1 ano", months: 12 },
  { label: "2 anos", months: 24 },
  { label: "3 anos", months: 36 },
] as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function calculateInvestment(initialAmount: number, months: number) {
  const totalYield = initialAmount * MONTHLY_YIELD_RATE * months;
  const finalAmount = initialAmount + totalYield;
  const monthlyAverageYield = months > 0 ? totalYield / months : 0;

  return { initialAmount, finalAmount, totalYield, monthlyAverageYield };
}

function amountProgress(value: number) {
  return ((value - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;
}

export function InvestmentCard() {
  const [initialAmount, setInitialAmount] = useState(MIN_AMOUNT);
  const [selectedMonths, setSelectedMonths] = useState<number>(4);

  const { finalAmount, totalYield, monthlyAverageYield } = useMemo(
    () => calculateInvestment(initialAmount, selectedMonths),
    [initialAmount, selectedMonths],
  );

  return (
    <div className="relative mx-auto w-full min-w-0 max-w-md rounded-md border border-white/10 bg-black shadow-lg lg:max-w-none">
      <header className="relative flex items-center justify-between rounded-t-md bg-yellow-base px-4 pt-10 pb-4 sm:px-6 sm:pt-4 sm:pb-5">
        <span className="text-xs font-bold text-black sm:text-sm md:text-base">
          Calculadora
        </span>
        <span className="text-xs font-bold text-black sm:text-sm md:text-base">
          Investimentos
        </span>

        <div className="absolute top-2 left-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-blackLight bg-yellow-base sm:size-20 sm:border-8">
          <CurrencyDollarIcon
            className="size-6 text-black sm:size-8"
            weight="bold"
          />
        </div>
      </header>

      <div className="space-y-6 px-4 pt-7 pb-5 sm:space-y-8 sm:px-6 sm:pt-8 sm:pb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="initial-amount"
              className="text-sm font-medium text-white"
            >
              Valor inicial
            </label>
            <span className="text-sm font-semibold text-white sm:text-base">
              {formatCurrency(initialAmount)}
            </span>
          </div>

          <div className="relative">
            <Progress
              value={amountProgress(initialAmount)}
              className="h-2 bg-white/10 [&_[data-slot=progress-indicator]]:bg-yellow-base"
            />
            <input
              id="initial-amount"
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={500}
              value={initialAmount}
              onChange={(event) => setInitialAmount(Number(event.target.value))}
              className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
              aria-label="Valor inicial do investimento"
            />
            <div
              className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-yellow-base"
              style={{ left: `${amountProgress(initialAmount)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-white/60">
            <span>{formatCurrency(MIN_AMOUNT)}</span>
            <span>{formatCurrency(MAX_AMOUNT)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-white">
            Por quanto tempo você quer investir?
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {DURATION_OPTIONS.map((option) => {
              const isSelected = selectedMonths === option.months;

              return (
                <button
                  key={option.months}
                  type="button"
                  onClick={() => setSelectedMonths(option.months)}
                  className={cn(
                    "cursor-pointer rounded-md px-2 py-2.5 text-[11px] font-semibold transition-colors sm:px-3 sm:py-2 sm:text-xs md:text-sm",
                    option.months === 36 && "col-span-2 sm:col-span-1",
                    isSelected
                      ? "bg-yellow-base text-black"
                      : "bg-white/10 text-white hover:bg-white/15",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-md bg-blackLight p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[11px] text-white/60 sm:text-sm">Valor inicial</p>
              <p className="truncate text-sm font-semibold text-white sm:text-base">
                {formatCurrency(initialAmount)}
              </p>
            </div>
            <div className="min-w-0 text-right">
              <p className="text-[11px] text-white/60 sm:text-sm">Valor final</p>
              <p className="truncate text-sm font-semibold text-white sm:text-base">
                {formatCurrency(finalAmount)}
              </p>
            </div>
          </div>

          <div className="my-3 border-t border-white/10 sm:my-4" />

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[11px] text-white/60 sm:text-sm">
                Rendimento total
              </p>
              <p className="truncate text-sm font-bold text-yellow-base sm:text-lg">
                {formatCurrency(totalYield)}
              </p>
            </div>
            <div className="min-w-0 text-right">
              <p className="text-[11px] text-white/60 sm:text-sm">Média mensal</p>
              <p className="truncate text-sm font-bold text-yellow-base sm:text-lg">
                {formatCurrency(monthlyAverageYield)}
              </p>
            </div>
          </div>
        </div>

        <ScrollStagger
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
          stagger={0.1}
        >
          {highlights.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={
                "flex items-center gap-3 rounded-md bg-yellow-base p-2"
              }
            >
              <div className={"shrink-0 rounded-sm bg-black p-2.5"}>
                <Icon weight="fill" size={22} className={"text-yellow-base"} />
              </div>
              <div className="min-w-0">
                <p className={"text-xs text-black/70"}>{label}</p>
                <p
                  className={"text-sm font-bold text-black sm:text-base"}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </ScrollStagger>
      </div>
    </div>
  );
}
