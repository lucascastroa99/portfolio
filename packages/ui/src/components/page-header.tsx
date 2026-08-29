import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: Readonly<PageHeaderProps>) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {action && <div className="mt-2 self-end sm:mt-0">{action}</div>}
    </div>
  );
}
