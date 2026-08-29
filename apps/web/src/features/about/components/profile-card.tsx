import { getLocale } from "@repo/i18n/runtime";
import { local } from "@repo/shared/utilities/locale";
import { renderWithBold } from "@repo/ui/components/render-bold";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/shadcn/avatar";
import { Badge } from "@repo/ui/shadcn/badge";
import { Card, CardContent } from "@repo/ui/shadcn/card";
import { personal, resume } from "@/data";

function ProfileCard() {
  const locale = getLocale();

  const summary = local(resume.summary, locale);
  const qualities = local(
    resume.skills.find((s) => s.label.en === "Soft Skills")?.details as {
      en: string;
      pt: string;
    },
    locale,
  ).split(/,\s*/);

  return (
    <Card className="border-2">
      <CardContent className="p-6 sm:p-8 2xl:p-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start 2xl:gap-8">
          <Avatar className="h-32 w-32 border-4 border-primary sm:h-40 sm:w-40 2xl:h-48 2xl:w-48">
            <AvatarImage src="https://github.com/lucascastroa99.png" alt="Lucas Castro" />
            <AvatarFallback className="font-bold text-4xl 2xl:text-5xl">LC</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4 text-center sm:text-left 2xl:space-y-5">
            <div>
              <h2 className="font-bold text-2xl sm:text-3xl 2xl:text-4xl">Lucas Castro</h2>
              <p className="text-lg text-primary sm:text-xl 2xl:text-2xl">
                {local(personal.position, locale)}
              </p>
            </div>

            <p className="text-justify text-base text-muted-foreground leading-relaxed sm:text-lg 2xl:text-xl">
              {renderWithBold(summary)}
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:justify-start 2xl:gap-3">
              {qualities.map((quality) => (
                <Badge
                  key={quality}
                  className="bg-primary text-primary-foreground text-sm hover:bg-primary/90 2xl:text-base"
                >
                  {quality}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProfileCard };
