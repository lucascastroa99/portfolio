import type { ReactNode } from "react";

interface TimelineProps {
  children: ReactNode;
}

function Timeline({ children }: Readonly<TimelineProps>) {
  return (
    <div className="relative space-y-8 2xl:space-y-10">
      <div className="absolute top-0 left-1 h-full w-0.5 bg-border sm:left-6 2xl:left-7" />
      {children}
    </div>
  );
}

interface TimelineItemProps {
  children: ReactNode;
}

function TimelineItem({ children }: Readonly<TimelineItemProps>) {
  return (
    <div className="relative pl-6 sm:pl-16 2xl:pl-20">
      <div className="absolute top-6 left-0 h-3 w-3 rounded-full border-2 border-primary bg-background sm:left-4.5 2xl:left-5.5 2xl:h-4 2xl:w-4" />
      {children}
    </div>
  );
}

export { Timeline, TimelineItem };
