import { DownloadResume } from "#components/download-resume";
import { LanguageSelector } from "#components/language-selector";
import { MobileMenu } from "#components/mobile-menu";
import { NavigationLinks } from "#components/navigation-links";
import { ThemeToggle } from "#components/theme-toggle";
import { cn } from "#libraries/utils";

interface AppHeaderProps {
  className?: string;
}

function AppHeader({ className }: Readonly<AppHeaderProps>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <MobileMenu />

        <NavigationLinks />

        <div className="md:hidden">
          <DownloadResume />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSelector />
          <ThemeToggle />
          <DownloadResume />
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
