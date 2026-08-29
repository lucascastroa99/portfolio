import {
  metadata_experiencePage_description,
  metadata_experiencePage_title,
  pages_experience_title,
} from "@repo/i18n/messages";
import { Skeleton } from "@repo/ui/shadcn/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { ExperienceTimeline, ProjectsGrid } from "@/features/experience/components";
import { PageContainer, PageHeader } from "@/features/shared/components";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: `${metadata_experiencePage_title()} | Lucas Castro` },
      { name: "description", content: metadata_experiencePage_description() },
      { property: "og:title", content: `${metadata_experiencePage_title()} | Lucas Castro` },
      { property: "og:description", content: metadata_experiencePage_description() },
    ],
  }),
  component: ExperiencePage,
  pendingComponent: ExperienceSkeleton,
});

function ExperiencePage() {
  return (
    <PageContainer>
      <div className="space-y-10">
        <PageHeader title={pages_experience_title()} />
        <ExperienceTimeline />
        <ProjectsGrid />
      </div>
    </PageContainer>
  );
}

function ExperienceSkeleton() {
  return (
    <PageContainer>
      <div className="space-y-10">
        <div className="text-center">
          <Skeleton className="mx-auto h-12 w-48" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    </PageContainer>
  );
}
