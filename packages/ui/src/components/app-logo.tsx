import symbol from "@repo/assets/images/symbol.webp";
import { cn } from "#libraries/utils";

export function ThemedSymbol({ className }: Readonly<{ className?: string }>) {
  return <img src={symbol} alt="Portfolio" className={className} />;
}

interface AppLogoProps {
  className?: string;
  subtitle?: string;
  layout?: "row" | "column";
}

export function AppLogo({ className, subtitle, layout = "row" }: Readonly<AppLogoProps>) {
  const isColumn = layout === "column";

  return (
    <div
      className={cn(
        "flex w-fit min-w-0 gap-2 overflow-hidden",
        isColumn ? "flex-col items-center" : "items-center",
        className,
      )}
    >
      <ThemedSymbol className={cn("shrink-0 object-contain", isColumn ? "size-16" : "size-8")} />
      <div className={cn("flex min-w-0 flex-col leading-none", isColumn && "items-center")}>
        <span className="truncate font-bold text-3xl text-secondary-foreground tracking-tight">
          Portfolio
        </span>
        {subtitle && <span className="truncate text-muted-foreground">{subtitle}</span>}
      </div>
    </div>
  );
}
