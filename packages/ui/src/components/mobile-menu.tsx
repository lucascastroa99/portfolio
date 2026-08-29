import { Icon } from "@iconify-icon/react";
import {
  components_headerBody_about,
  components_headerBody_closeMenu,
  components_headerBody_contact,
  components_headerBody_dark,
  components_headerBody_darkTheme,
  components_headerBody_education,
  components_headerBody_experience,
  components_headerBody_home,
  components_headerBody_language,
  components_headerBody_light,
  components_headerBody_lightTheme,
  components_headerBody_menuTitle,
  components_headerBody_openMenu,
  components_headerBody_theme,
} from "@repo/i18n/messages";
import { getLocale, setLocale } from "@repo/i18n/runtime";
import { LANGUAGES_ARRAY } from "@repo/shared/constants/navigation";
import { Link, useLocation } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "#components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "#components/ui/sheet";
import { cn } from "#libraries/utils";
import { useTheme } from "#providers/theme-provider";

const NAV_LABELS = {
  "/": components_headerBody_home,
  "/about": components_headerBody_about,
  "/experience": components_headerBody_experience,
  "/education": components_headerBody_education,
  "/contact": components_headerBody_contact,
};

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, mounted, setTheme } = useTheme();
  const resolvedTheme = !mounted
    ? "light"
    : theme === "system"
      ? typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  const locale = getLocale();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? components_headerBody_closeMenu() : components_headerBody_openMenu()}
        >
          <span className="size-5">&#9776;</span>
          <span className="sr-only">
            {open ? components_headerBody_closeMenu() : components_headerBody_openMenu()}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-75 flex-col sm:w-100">
        <SheetHeader>
          <SheetTitle className="text-2xl">{components_headerBody_menuTitle()}</SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-1 flex-col gap-4">
          {Object.entries(NAV_LABELS).map(([href, labelFn]) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href as "/"}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-4 py-3 font-medium text-base transition-colors hover:bg-secondary",
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                {labelFn()}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-4 border-border border-t px-3 pt-4 pb-3">
          <div className="space-y-2">
            <p className="px-2 font-medium text-muted-foreground text-sm">
              {components_headerBody_language()}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES_ARRAY.map((lang) => {
                const isActive =
                  (lang.code === "en-us" && locale === "en") ||
                  (lang.code === "pt-br" && locale === "pt");
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLocale(lang.code === "pt-br" ? "pt" : "en")}
                    disabled={isActive}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-md border-2 px-4 py-3 font-medium transition-all",
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary hover:bg-secondary",
                      isActive && "disabled:cursor-not-allowed disabled:opacity-50",
                    )}
                  >
                    <Icon icon={lang.flag} className="size-5" />
                    <span className="text-sm">{lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <p className="px-2 font-medium text-muted-foreground text-sm">
              {components_headerBody_theme()}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-md border-2 px-4 py-3 font-medium transition-all",
                  resolvedTheme === "light"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary hover:bg-secondary",
                )}
                aria-label={components_headerBody_lightTheme()}
              >
                <Sun className="size-5" />
                <span className="text-sm">{components_headerBody_light()}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-md border-2 px-4 py-3 font-medium transition-all",
                  resolvedTheme === "dark"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary hover:bg-secondary",
                )}
                aria-label={components_headerBody_darkTheme()}
              >
                <Moon className="size-5" />
                <span className="text-sm">{components_headerBody_dark()}</span>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileMenu };
