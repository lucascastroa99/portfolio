import { Icon } from "@iconify-icon/react";
import { pages_about_languages } from "@repo/i18n/messages";
import { getLocale } from "@repo/i18n/runtime";
import { local } from "@repo/shared/utilities/locale";
import { Card, CardContent } from "@repo/ui/shadcn/card";
import { resume } from "@/data";

function LanguagesSection() {
  const locale = getLocale();
  const languages = resume.languages;

  return (
    <section className="space-y-5 2xl:space-y-6">
      <h3 className="border-border border-b pb-2 font-semibold text-xl sm:text-2xl 2xl:text-3xl">
        {pages_about_languages()}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:gap-6">
        {languages.map((lang) => {
          const flagIcon = lang.label.en === "Portuguese" ? "circle-flags:br" : "circle-flags:us";

          return (
            <Card key={local(lang.label, locale)} className="border-2 py-0">
              <CardContent className="p-4 sm:p-5 2xl:p-5">
                <div className="flex items-center gap-3">
                  <Icon icon={flagIcon} style={{ fontSize: "40px" }} className="shrink-0" />
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg 2xl:text-xl">
                      {local(lang.label, locale)}
                    </h4>
                    <p className="text-muted-foreground text-sm 2xl:text-base">
                      {local(lang.level, locale)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export { LanguagesSection };
