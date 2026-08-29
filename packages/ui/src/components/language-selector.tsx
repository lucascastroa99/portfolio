import { Icon } from "@iconify-icon/react";
import { components_headerBody_language } from "@repo/i18n/messages";
import { getLocale, setLocale } from "@repo/i18n/runtime";
import { LANGUAGES_ARRAY } from "@repo/shared/constants/navigation";
import { Languages } from "lucide-react";
import { Button } from "#components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "#components/ui/tooltip";

function LanguageSelector() {
  const locale = getLocale();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Languages className="size-5" />
              <span className="sr-only">{components_headerBody_language()}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">{components_headerBody_language()}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {LANGUAGES_ARRAY.map((lang) => {
          const isActive =
            (lang.code === "en-us" && locale === "en") ||
            (lang.code === "pt-br" && locale === "pt");
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLocale(lang.code === "pt-br" ? "pt" : "en")}
              disabled={isActive}
              className="flex cursor-pointer items-center gap-2"
            >
              <Icon icon={lang.flag} className="size-3.5" />
              {lang.name}
              {isActive && " ✓"}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LanguageSelector };
