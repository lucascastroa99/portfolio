import { Icon } from "@iconify-icon/react";
import { components_headerBody_resume } from "@repo/i18n/messages";
import { RESUME_OPTIONS } from "@repo/shared/constants/navigation";
import { trackResumeDownload } from "@repo/shared/utilities/analytics";
import { DownloadIcon } from "lucide-react";
import { Button } from "#components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";

function DownloadResume() {
  const handleDownload = (url: string, language: "en" | "pt") => {
    trackResumeDownload(language);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary text-black hover:bg-primary/90">
          {components_headerBody_resume()}
          <DownloadIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleDownload(RESUME_OPTIONS.enUS.url, "en")}
          className="flex cursor-pointer items-center gap-2"
        >
          <Icon icon={RESUME_OPTIONS.enUS.flag} className="size-3.5" />
          {RESUME_OPTIONS.enUS.label}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDownload(RESUME_OPTIONS.ptBR.url, "pt")}
          className="flex cursor-pointer items-center gap-2"
        >
          <Icon icon={RESUME_OPTIONS.ptBR.flag} className="size-3.5" />
          {RESUME_OPTIONS.ptBR.label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DownloadResume };
