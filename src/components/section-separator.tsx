import { cn } from "@/lib/utils";

type SectionSeparatorProps = {
  separator: string;
  label?: string;
  labelZoneWidth?: string;
  separatorWidth?: string;
  labelBackground?: string;
  className?: string;
};

export function SectionSeparator({
  separator,
  label,
  labelZoneWidth = "14%",
  separatorWidth = "86%",
  labelBackground = "bg-black",
  className,
}: SectionSeparatorProps) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 -top-1 z-10 flex w-full items-stretch",
        labelBackground,
        className,
      )}
      aria-hidden
    >
      {label && (
        <div
          className={cn(
            "relative flex shrink-0 items-center self-stretch",
            "pl-[clamp(1rem,4.17vw,5rem)] pr-2",
          )}
          style={{ width: labelZoneWidth }}
        >
          <p className="truncate whitespace-nowrap text-[clamp(1rem,0.73vw,1rem)] font-bold uppercase tracking-wide text-white">
            {label}
          </p>
        </div>
      )}

      <img
        src={separator}
        alt=""
        className="block h-auto shrink-0"
        style={{ width: separatorWidth }}
      />
    </div>
  );
}
