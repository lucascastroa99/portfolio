import {
  components_headerBody_about,
  components_headerBody_contact,
  components_headerBody_education,
  components_headerBody_experience,
  components_headerBody_home,
} from "@repo/i18n/messages";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "#libraries/utils";

interface NavigationLinksProps {
  className?: string;
}

const NAV_LABELS = {
  "/": components_headerBody_home,
  "/about": components_headerBody_about,
  "/experience": components_headerBody_experience,
  "/education": components_headerBody_education,
  "/contact": components_headerBody_contact,
};

function NavigationLinks({ className }: Readonly<NavigationLinksProps>) {
  const location = useLocation();

  return (
    <nav className={cn("hidden items-center gap-1 md:flex", className)}>
      {Object.entries(NAV_LABELS).map(([href, labelFn]) => {
        const isActive = location.pathname === href;
        return (
          <Link
            key={href}
            to={href as "/"}
            className={cn(
              "rounded-md px-4 py-2 font-medium text-sm transition-colors hover:bg-secondary",
              isActive ? "bg-secondary text-primary" : "text-foreground/80 hover:text-foreground",
            )}
          >
            {labelFn()}
          </Link>
        );
      })}
    </nav>
  );
}

export { NavigationLinks };
