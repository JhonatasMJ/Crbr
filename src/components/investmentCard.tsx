import { useMemo, useState } from "react"
import { CurrencyDollarIcon } from "@phosphor-icons/react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const MIN_AMOUNT = 4_000
const MAX_AMOUNT = 100_000
const BASE_MONTHS = 4
const YIELD_RATE_PER_BASE = 0.1
const MONTHLY_YIELD_RATE = YIELD_RATE_PER_BASE / BASE_MONTHS

const DURATION_OPTIONS = [
  { label: "4 meses", months: 4 },
  { label: "8 meses", months: 8 },
  { label: "1 ano", months: 12 },
  { label: "2 anos", months: 24 },
  { label: "3 anos", months: 36 },
] as const

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

function calculateInvestment(initialAmount: number, months: number) {
  const totalYield = initialAmount * MONTHLY_YIELD_RATE * months
  const finalAmount = initialAmount + totalYield
  const monthlyAverageYield = months > 0 ? totalYield / months : 0

  return { initialAmount, finalAmount, totalYield, monthlyAverageYield }
}

function amountProgress(value: number) {
  return ((value - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100
}

export function InvestmentCard() {
  const [initialAmount, setInitialAmount] = useState(MIN_AMOUNT)
  const [selectedMonths, setSelectedMonths] = useState<number>(4)

  const { finalAmount, totalYield, monthlyAverageYield } = useMemo(
    () => calculateInvestment(initialAmount, selectedMonths),
    [initialAmount, selectedMonths],
  )

  return (
    <div className="relative mx-auto w-full max-w-md rounded-md bg-black lg:max-w-none">
      <header className="relative flex items-center justify-between rounded-t-md bg-yellow-base px-6 py-4">
        <span className="text-sm font-bold text-black sm:text-base">Calculadora</span>
        <span className="text-sm font-bold text-black sm:text-base">Investimentos</span>

        <div className="absolute top-2 left-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-blackLight bg-yellow-base">
          <CurrencyDollarIcon className="size-8 text-black" weight="bold" />
        </div>
      </header>

      <div className="space-y-8 px-6 pt-6 pb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="initial-amount" className="text-sm font-medium text-white">
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

          <div className="flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((option) => {
              const isSelected = selectedMonths === option.months

              return (
                <button
                  key={option.months}
                  type="button"
                  onClick={() => setSelectedMonths(option.months)}
                  className={cn(
                    "flex-1 cursor-pointer rounded-md px-3 py-2 text-xs font-semibold transition-colors md:text-sm",
                    isSelected
                      ? "bg-yellow-base text-black"
                      : "bg-white/10 text-white hover:bg-white/15",
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg bg-white/5 p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-white/70 sm:text-sm">Valor inicial</p>
              <p className="text-sm font-semibold text-white sm:text-base">
                {formatCurrency(initialAmount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/70 sm:text-sm">Valor final</p>
              <p className="text-sm font-semibold text-white sm:text-base">
                {formatCurrency(finalAmount)}
              </p>
            </div>
          </div>

          <div className="my-4 border-t border-white/10" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-white/70 sm:text-sm">Rendimento total</p>
              <p className="text-sm font-semibold text-yellow-base sm:text-base">
                {formatCurrency(totalYield)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/70 sm:text-sm">Rendimento mensal</p>
              <p className="text-sm font-semibold text-yellow-base sm:text-base">
                {formatCurrency(monthlyAverageYield)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
