import {
  metadata_aboutPage_description,
  metadata_aboutPage_title,
  pages_about_title,
} from "@repo/i18n/messages";
import { Skeleton } from "@repo/ui/shadcn/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { LanguagesSection, ProfileCard, SkillCategories } from "@/features/about/components";
import { PageContainer, PageHeader } from "@/features/shared/components";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `${metadata_aboutPage_title()} | Lucas Castro` },
      { name: "description", content: metadata_aboutPage_description() },
      { property: "og:title", content: `${metadata_aboutPage_title()} | Lucas Castro` },
      { property: "og:description", content: metadata_aboutPage_description() },
    ],
  }),
  component: AboutPage,
  pendingComponent: AboutSkeleton,
});

function AboutPage() {
  return (
    <PageContainer>
      <div className="space-y-10">
        <PageHeader title={pages_about_title()} />
        <ProfileCard />
        <SkillCategories />
        <LanguagesSection />
      </div>
    </PageContainer>
  );
}

function AboutSkeleton() {
  return (
    <PageContainer>
      <div className="space-y-10">
        <div className="text-center">
          <Skeleton className="mx-auto h-12 w-48" />
        </div>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </PageContainer>
  );
}
