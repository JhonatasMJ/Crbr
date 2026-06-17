import { cn } from "@/lib/utils";

type SectionSeparatorProps = {
  separator: string;
  label?: string;
  labelBackground?: string;
  className?: string;
};

export function SectionSeparator({
  separator,
  label,
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
            "max-w-[45%] pl-4 pr-2 sm:max-w-[30%] md:max-w-none md:w-[14%]",
            "md:pl-[clamp(1rem,4.17vw,5rem)]",
          )}
        >
          <p className="truncate whitespace-nowrap text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
            {label}
          </p>
        </div>
      )}

      <img
        src={separator}
        alt=""
        className="block h-auto min-w-0 flex-1 object-cover object-left"
      />
    </div>
  );
}
