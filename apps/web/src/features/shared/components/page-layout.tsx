import { cn } from "@repo/ui/libraries/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  className?: string;
}

function PageHeader({ title, className }: Readonly<PageHeaderProps>) {
  return (
    <div className={cn("text-center", className)}>
      <h1 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl 2xl:text-6xl">
        {title}
      </h1>
    </div>
  );
}

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

function PageContainer({ children, className }: Readonly<PageContainerProps>) {
  return (
    <div className={cn("container mx-auto max-w-6xl px-4 py-6 2xl:max-w-7xl", className)}>
      {children}
    </div>
  );
}

export { PageContainer, PageHeader };
