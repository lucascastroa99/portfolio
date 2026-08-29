import { pages_experience_professional } from "@repo/i18n/messages";
import { getLocale } from "@repo/i18n/runtime";
import { formatDate, getDuration } from "@repo/shared/utilities/date";
import { local } from "@repo/shared/utilities/locale";
import { renderWithBold } from "@repo/ui/components/render-bold";
import { Card, CardContent, CardHeader } from "@repo/ui/shadcn/card";
import { Briefcase } from "lucide-react";
import { resume } from "@/data";
import { Timeline, TimelineItem } from "@/features/shared/components/timeline";

function ExperienceTimeline() {
  const locale = getLocale();
  const experience = resume.experience;

  return (
    <section className="space-y-6 2xl:space-y-8">
      <h2 className="font-bold text-2xl tracking-tight sm:text-3xl 2xl:text-4xl">
        {pages_experience_professional()}
      </h2>

      <Timeline>
        {experience.map((exp, index) => {
          const position = local(exp.position, locale);
          const location = local(exp.location, locale);
          const highlights = local(exp.highlights, locale);

          return (
            <TimelineItem key={`${exp.company}-${exp.date.start}-${index}`}>
              <Card className="border-2 transition-all hover:border-primary">
                <CardHeader className="gap-2 p-4 pb-0! sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between 2xl:gap-3">
                    <div className="space-y-1 2xl:space-y-1.5">
                      <h3 className="font-bold text-xl sm:text-2xl 2xl:text-3xl">{position}</h3>
                      <p className="font-medium text-base text-primary sm:text-lg 2xl:text-xl">
                        {exp.company}
                      </p>
                      <p className="text-muted-foreground text-sm 2xl:text-base">{location}</p>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-1 text-muted-foreground text-sm sm:items-end 2xl:text-base">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 2xl:h-5 2xl:w-5" />
                        <span>
                          {formatDate(exp.date.start, locale)} - {formatDate(exp.date.end, locale)}
                        </span>
                      </div>
                      <span className="text-xs 2xl:text-sm">
                        {getDuration(exp.date.start, exp.date.end, locale)}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 p-4 pt-0! sm:p-6 2xl:space-y-3">
                  <ul className="space-y-2 text-muted-foreground text-sm sm:text-base 2xl:text-lg">
                    {highlights.map((item, i) => (
                      <li key={`${exp.company}-desc-${i}`} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{renderWithBold(item)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TimelineItem>
          );
        })}
      </Timeline>
    </section>
  );
}

export { ExperienceTimeline };
