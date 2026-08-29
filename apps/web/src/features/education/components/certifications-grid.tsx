import { pages_education_certifications, pages_education_score } from "@repo/i18n/messages";
import { getLocale } from "@repo/i18n/runtime";
import { formatDate } from "@repo/shared/utilities/date";
import { local } from "@repo/shared/utilities/locale";
import { Card, CardContent, CardHeader } from "@repo/ui/shadcn/card";
import { Award, ExternalLink } from "lucide-react";
import { resume } from "@/data";

function CertificationsGrid() {
  const locale = getLocale();
  const certifications = resume.certifications;

  return (
    <section className="space-y-6 2xl:space-y-8">
      <h2 className="font-bold text-2xl tracking-tight sm:text-3xl 2xl:text-4xl">
        {pages_education_certifications()}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:gap-8">
        {certifications.map((cert, index) => {
          const score = local(cert.score, locale);

          return (
            <Card
              key={`${cert.institution}-${cert.area}-${index}`}
              className="border-2 transition-all hover:border-primary"
            >
              <CardHeader className="gap-2 p-4 pb-0! sm:p-6">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-xl sm:text-2xl 2xl:text-3xl">{cert.area}</h3>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <p className="font-medium text-base text-primary sm:text-lg 2xl:text-xl">
                  {cert.institution}
                </p>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0! sm:p-6 2xl:space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground text-sm 2xl:text-base">
                  <Award className="h-4 w-4 2xl:h-5 2xl:w-5" />
                  <span>{formatDate(cert.date.start, locale)}</span>
                </div>
                {score && (
                  <p className="text-muted-foreground text-sm 2xl:text-base">
                    {pages_education_score()}: {score}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export { CertificationsGrid };
