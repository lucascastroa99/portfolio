import {
  metadata_educationPage_description,
  metadata_educationPage_title,
  pages_education_title,
} from "@repo/i18n/messages";
import { Skeleton } from "@repo/ui/shadcn/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { CertificationsGrid, EducationTimeline } from "@/features/education/components";
import { PageContainer, PageHeader } from "@/features/shared/components";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: `${metadata_educationPage_title()} | Lucas Castro` },
      { name: "description", content: metadata_educationPage_description() },
      { property: "og:title", content: `${metadata_educationPage_title()} | Lucas Castro` },
      { property: "og:description", content: metadata_educationPage_description() },
    ],
  }),
  component: EducationPage,
  pendingComponent: EducationSkeleton,
});

function EducationPage() {
  return (
    <PageContainer>
      <div className="space-y-10">
        <PageHeader title={pages_education_title()} />
        <EducationTimeline />
        <CertificationsGrid />
      </div>
    </PageContainer>
  );
}

function EducationSkeleton() {
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
