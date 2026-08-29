import { pages_experience_projects } from "@repo/i18n/messages";
import { getLocale } from "@repo/i18n/runtime";
import { formatDate } from "@repo/shared/utilities/date";
import { local } from "@repo/shared/utilities/locale";
import { renderWithBold } from "@repo/ui/components/render-bold";
import { Card, CardContent, CardHeader } from "@repo/ui/shadcn/card";
import { resume } from "@/data";

function ProjectsGrid() {
  const locale = getLocale();
  const projects = resume.projects;

  return (
    <section className="space-y-6 2xl:space-y-8">
      <h2 className="font-bold text-2xl tracking-tight sm:text-3xl 2xl:text-4xl">
        {pages_experience_projects()}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:gap-8">
        {projects.map((project) => {
          const highlights = local(project.highlights, locale);

          return (
            <Card key={project.name} className="border-2 transition-all hover:border-primary">
              <CardHeader className="gap-2 p-4 pb-0! sm:p-6">
                <h3 className="font-bold text-xl sm:text-2xl 2xl:text-3xl">{project.name}</h3>
                <p className="text-muted-foreground text-sm 2xl:text-base">
                  {formatDate(project.date.start, locale)} - {formatDate(project.date.end, locale)}
                </p>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0! sm:p-6 2xl:space-y-3">
                <ul className="space-y-1 text-muted-foreground text-sm sm:text-base 2xl:text-lg">
                  {highlights.map((item, i) => (
                    <li key={`${project.name}-desc-${i}`} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{renderWithBold(item)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export { ProjectsGrid };
