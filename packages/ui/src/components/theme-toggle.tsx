import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button } from "#components/ui/button";
import { Skeleton } from "#components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "#components/ui/tooltip";
import { useTheme } from "#providers/theme-provider";

const THEMES = ["system", "light", "dark"] as const;

function getNextTheme(current: string): "system" | "light" | "dark" {
  const idx = THEMES.indexOf(current as (typeof THEMES)[number]);
  return THEMES[(idx + 1) % THEMES.length];
}

function getIcon(theme: string) {
  switch (theme) {
    case "dark":
      return <MoonIcon className="size-4" />;
    case "light":
      return <SunIcon className="size-4" />;
    default:
      return <MonitorIcon className="size-4" />;
  }
}

function getLabel(theme: string) {
  switch (theme) {
    case "dark":
      return "Dark";
    case "light":
      return "Light";
    default:
      return "System";
  }
}

function ThemeToggle() {
  const { theme, mounted, setTheme } = useTheme();

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Skeleton className="size-9 rounded-md" />
        <span className="sr-only">Toggle Theme</span>
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setTheme(getNextTheme(theme))}>
          {getIcon(theme)}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="font-bold">{getLabel(theme)}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { ThemeToggle };
