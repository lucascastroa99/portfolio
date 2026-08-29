import {
  metadata_termsOfService_description,
  metadata_termsOfService_title,
  pages_termsOfService_backToHome,
  pages_termsOfService_date,
  pages_termsOfService_lastUpdated,
  pages_termsOfService_sections_acceptance_content,
  pages_termsOfService_sections_acceptance_title,
  pages_termsOfService_sections_contact_content,
  pages_termsOfService_sections_contact_title,
  pages_termsOfService_sections_description_content,
  pages_termsOfService_sections_description_title,
  pages_termsOfService_sections_disclaimer_content,
  pages_termsOfService_sections_disclaimer_title,
  pages_termsOfService_sections_externalLinks_content,
  pages_termsOfService_sections_externalLinks_title,
  pages_termsOfService_sections_governingLaw_content,
  pages_termsOfService_sections_governingLaw_title,
  pages_termsOfService_sections_intellectualProperty_content,
  pages_termsOfService_sections_intellectualProperty_title,
  pages_termsOfService_sections_limitationLiability_content,
  pages_termsOfService_sections_limitationLiability_title,
  pages_termsOfService_sections_modifications_content,
  pages_termsOfService_sections_modifications_title,
  pages_termsOfService_sections_userConduct_content,
  pages_termsOfService_sections_userConduct_prohibitions_0,
  pages_termsOfService_sections_userConduct_prohibitions_1,
  pages_termsOfService_sections_userConduct_prohibitions_2,
  pages_termsOfService_sections_userConduct_prohibitions_3,
  pages_termsOfService_sections_userConduct_title,
  pages_termsOfService_title,
} from "@repo/i18n/messages";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/features/shared/components";

export const Route = createFileRoute("/legal/terms-of-service")({
  head: () => ({
    meta: [
      { title: `${metadata_termsOfService_title()} | Lucas Castro` },
      { name: "description", content: metadata_termsOfService_description() },
    ],
  }),
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <PageContainer className="max-w-4xl py-12">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground text-sm no-underline transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {pages_termsOfService_backToHome()}
        </Link>

        <h1>{pages_termsOfService_title()}</h1>
        <p className="text-muted-foreground">
          {pages_termsOfService_lastUpdated()}: {pages_termsOfService_date()}
        </p>

        <section>
          <h2>{pages_termsOfService_sections_acceptance_title()}</h2>
          <p>{pages_termsOfService_sections_acceptance_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_description_title()}</h2>
          <p>{pages_termsOfService_sections_description_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_intellectualProperty_title()}</h2>
          <p>{pages_termsOfService_sections_intellectualProperty_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_userConduct_title()}</h2>
          <p>{pages_termsOfService_sections_userConduct_content()}</p>
          <ul>
            <li>{pages_termsOfService_sections_userConduct_prohibitions_0()}</li>
            <li>{pages_termsOfService_sections_userConduct_prohibitions_1()}</li>
            <li>{pages_termsOfService_sections_userConduct_prohibitions_2()}</li>
            <li>{pages_termsOfService_sections_userConduct_prohibitions_3()}</li>
          </ul>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_disclaimer_title()}</h2>
          <p>{pages_termsOfService_sections_disclaimer_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_limitationLiability_title()}</h2>
          <p>{pages_termsOfService_sections_limitationLiability_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_externalLinks_title()}</h2>
          <p>{pages_termsOfService_sections_externalLinks_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_modifications_title()}</h2>
          <p>{pages_termsOfService_sections_modifications_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_governingLaw_title()}</h2>
          <p>{pages_termsOfService_sections_governingLaw_content()}</p>
        </section>

        <section>
          <h2>{pages_termsOfService_sections_contact_title()}</h2>
          <p>
            {pages_termsOfService_sections_contact_content()}{" "}
            <a
              href="mailto:lucascastro.a99@gmail.com"
              className="text-primary underline hover:text-primary/80"
            >
              lucascastro.a99@gmail.com
            </a>
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
