import {
  components_footer_author,
  components_footer_madeWith,
  components_footer_privacyPolicy,
  components_footer_termsOfService,
} from "@repo/i18n/messages";
import { Link } from "@tanstack/react-router";
import { cn } from "#libraries/utils";

interface AppFooterProps {
  className?: string;
}

function AppFooter({ className }: Readonly<AppFooterProps>) {
  return (
    <footer className={cn("w-full border-border/40 border-t bg-background py-6", className)}>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <span>{components_footer_madeWith()}</span>
          <a
            href="https://github.com/lucascastroa99"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:text-primary"
          >
            {components_footer_author()}
          </a>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            to="/legal/terms-of-service"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {components_footer_termsOfService()}
          </Link>
          <Link
            to="/legal/privacy-policy"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {components_footer_privacyPolicy()}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export { AppFooter };
