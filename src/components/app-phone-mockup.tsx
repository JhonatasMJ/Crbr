import { Iphone } from "@/components/ui/iphone";
import { cn } from "@/lib/utils";

type AppPhoneMockupProps = {
  src: string;
  className?: string;
};

export function AppPhoneMockup({ src, className }: AppPhoneMockupProps) {
  return (
    <div
      className={cn(
        "dark mx-auto w-[270px] sm:w-[300px] lg:w-[320px]",
        className,
      )}
    >
      <Iphone
        src={src}
        className="w-full"
        imageClassName="origin-top scale-[2.75] object-cover object-[50%_10%]"
      />
    </div>
  );
}
