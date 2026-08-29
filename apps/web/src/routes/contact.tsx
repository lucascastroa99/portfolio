import {
  metadata_contactPage_description,
  metadata_contactPage_title,
  pages_contact_subtitle,
  pages_contact_title,
} from "@repo/i18n/messages";
import { Skeleton } from "@repo/ui/shadcn/skeleton";
import { createFileRoute } from "@tanstack/react-router";
import { ContactInfo, SocialLinks } from "@/features/contact/components";
import { PageContainer, PageHeader } from "@/features/shared/components";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `${metadata_contactPage_title()} | Lucas Castro` },
      { name: "description", content: metadata_contactPage_description() },
      { property: "og:title", content: `${metadata_contactPage_title()} | Lucas Castro` },
      { property: "og:description", content: metadata_contactPage_description() },
    ],
  }),
  component: ContactPage,
  pendingComponent: ContactSkeleton,
});

function ContactPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      <PageContainer>
        <div className="space-y-10 2xl:space-y-12">
          <div className="text-center">
            <PageHeader title={pages_contact_title()} />
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl 2xl:text-2xl">
              {pages_contact_subtitle()}
            </p>
          </div>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10 2xl:gap-12">
            <ContactInfo />
            <SocialLinks />
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

function ContactSkeleton() {
  return (
    <PageContainer>
      <div className="space-y-10">
        <div className="text-center">
          <Skeleton className="mx-auto h-12 w-48" />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    </PageContainer>
  );
}
