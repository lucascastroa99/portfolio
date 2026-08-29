import { pages_education_academic } from "@repo/i18n/messages";
import { getLocale } from "@repo/i18n/runtime";
import { formatDate } from "@repo/shared/utilities/date";
import { local } from "@repo/shared/utilities/locale";
import { Card, CardHeader } from "@repo/ui/shadcn/card";
import { GraduationCap } from "lucide-react";
import { resume } from "@/data";
import { Timeline, TimelineItem } from "@/features/shared/components/timeline";

function EducationTimeline() {
  const locale = getLocale();
  const education = resume.education;

  return (
    <section className="space-y-6 2xl:space-y-8">
      <h2 className="font-bold text-2xl tracking-tight sm:text-3xl 2xl:text-4xl">
        {pages_education_academic()}
      </h2>

      <Timeline>
        {education.map((edu, index) => {
          const institution = local(edu.institution, locale);
          const area = local(edu.area, locale);
          const location = local(edu.location, locale);

          return (
            <TimelineItem key={`${institution}-${edu.date.start}-${index}`}>
              <Card className="border-2 transition-all hover:border-primary">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between 2xl:gap-3">
                    <div className="space-y-1 2xl:space-y-1.5">
                      <h3 className="font-bold text-xl sm:text-2xl 2xl:text-3xl">{area}</h3>
                      <p className="font-medium text-base text-primary sm:text-lg 2xl:text-xl">
                        {institution}
                      </p>
                      <p className="text-muted-foreground text-sm 2xl:text-base">{location}</p>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-1 text-muted-foreground text-sm sm:items-end 2xl:text-base">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 2xl:h-5 2xl:w-5" />
                        <span>
                          {formatDate(edu.date.start, locale)} - {formatDate(edu.date.end, locale)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </TimelineItem>
          );
        })}
      </Timeline>
    </section>
  );
}

export { EducationTimeline };
