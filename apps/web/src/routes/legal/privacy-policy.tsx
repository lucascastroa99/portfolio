import {
  metadata_privacyPolicy_description,
  metadata_privacyPolicy_title,
  pages_privacyPolicy_backToHome,
  pages_privacyPolicy_date,
  pages_privacyPolicy_lastUpdated,
  pages_privacyPolicy_sections_changes_content,
  pages_privacyPolicy_sections_changes_title,
  pages_privacyPolicy_sections_contact_content,
  pages_privacyPolicy_sections_contact_title,
  pages_privacyPolicy_sections_cookies_content,
  pages_privacyPolicy_sections_cookies_title,
  pages_privacyPolicy_sections_cookies_types_essential_description,
  pages_privacyPolicy_sections_cookies_types_essential_title,
  pages_privacyPolicy_sections_dataSecurity_content,
  pages_privacyPolicy_sections_dataSecurity_title,
  pages_privacyPolicy_sections_dataSharing_content,
  pages_privacyPolicy_sections_dataSharing_title,
  pages_privacyPolicy_sections_dataUse_content,
  pages_privacyPolicy_sections_dataUse_purposes_0,
  pages_privacyPolicy_sections_dataUse_purposes_1,
  pages_privacyPolicy_sections_dataUse_purposes_2,
  pages_privacyPolicy_sections_dataUse_title,
  pages_privacyPolicy_sections_informationCollection_content,
  pages_privacyPolicy_sections_informationCollection_items_0,
  pages_privacyPolicy_sections_informationCollection_items_1,
  pages_privacyPolicy_sections_informationCollection_items_2,
  pages_privacyPolicy_sections_informationCollection_title,
  pages_privacyPolicy_sections_introduction_content,
  pages_privacyPolicy_sections_introduction_title,
  pages_privacyPolicy_sections_thirdPartyLinks_content,
  pages_privacyPolicy_sections_thirdPartyLinks_title,
  pages_privacyPolicy_sections_yourRights_content,
  pages_privacyPolicy_sections_yourRights_rights_0,
  pages_privacyPolicy_sections_yourRights_rights_1,
  pages_privacyPolicy_sections_yourRights_rights_2,
  pages_privacyPolicy_sections_yourRights_rights_3,
  pages_privacyPolicy_sections_yourRights_title,
  pages_privacyPolicy_title,
} from "@repo/i18n/messages";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/features/shared/components";

export const Route = createFileRoute("/legal/privacy-policy")({
  head: () => ({
    meta: [
      { title: `${metadata_privacyPolicy_title()} | Lucas Castro` },
      { name: "description", content: metadata_privacyPolicy_description() },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <PageContainer className="max-w-4xl py-12">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground text-sm no-underline transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {pages_privacyPolicy_backToHome()}
        </Link>

        <h1>{pages_privacyPolicy_title()}</h1>
        <p className="text-muted-foreground">
          {pages_privacyPolicy_lastUpdated()}: {pages_privacyPolicy_date()}
        </p>

        <section>
          <h2>{pages_privacyPolicy_sections_introduction_title()}</h2>
          <p>{pages_privacyPolicy_sections_introduction_content()}</p>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_informationCollection_title()}</h2>
          <p>{pages_privacyPolicy_sections_informationCollection_content()}</p>
          <ul>
            <li>{pages_privacyPolicy_sections_informationCollection_items_0()}</li>
            <li>{pages_privacyPolicy_sections_informationCollection_items_1()}</li>
            <li>{pages_privacyPolicy_sections_informationCollection_items_2()}</li>
          </ul>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_cookies_title()}</h2>
          <p>{pages_privacyPolicy_sections_cookies_content()}</p>
          <ul>
            <li>
              <strong>{pages_privacyPolicy_sections_cookies_types_essential_title()}</strong>:{" "}
              {pages_privacyPolicy_sections_cookies_types_essential_description()}
            </li>
          </ul>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_dataUse_title()}</h2>
          <p>{pages_privacyPolicy_sections_dataUse_content()}</p>
          <ul>
            <li>{pages_privacyPolicy_sections_dataUse_purposes_0()}</li>
            <li>{pages_privacyPolicy_sections_dataUse_purposes_1()}</li>
            <li>{pages_privacyPolicy_sections_dataUse_purposes_2()}</li>
          </ul>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_dataSharing_title()}</h2>
          <p>{pages_privacyPolicy_sections_dataSharing_content()}</p>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_dataSecurity_title()}</h2>
          <p>{pages_privacyPolicy_sections_dataSecurity_content()}</p>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_yourRights_title()}</h2>
          <p>{pages_privacyPolicy_sections_yourRights_content()}</p>
          <ul>
            <li>{pages_privacyPolicy_sections_yourRights_rights_0()}</li>
            <li>{pages_privacyPolicy_sections_yourRights_rights_1()}</li>
            <li>{pages_privacyPolicy_sections_yourRights_rights_2()}</li>
            <li>{pages_privacyPolicy_sections_yourRights_rights_3()}</li>
          </ul>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_thirdPartyLinks_title()}</h2>
          <p>{pages_privacyPolicy_sections_thirdPartyLinks_content()}</p>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_changes_title()}</h2>
          <p>{pages_privacyPolicy_sections_changes_content()}</p>
        </section>

        <section>
          <h2>{pages_privacyPolicy_sections_contact_title()}</h2>
          <p>
            {pages_privacyPolicy_sections_contact_content()}{" "}
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
