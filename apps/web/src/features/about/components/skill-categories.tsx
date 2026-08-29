import { Icon } from "@iconify-icon/react";
import { getLocale } from "@repo/i18n/runtime";
import { SKILL_CATEGORIES } from "@repo/shared/constants/skill-categories";

function SkillCategories() {
  const locale = getLocale();
  const isEnglish = locale === "en";

  return (
    <div className="space-y-10 2xl:space-y-12">
      {SKILL_CATEGORIES.map((category) => (
        <section key={category.titleEN} className="space-y-5 2xl:space-y-6">
          <h3 className="border-border border-b pb-2 font-semibold text-xl sm:text-2xl 2xl:text-3xl">
            {isEnglish ? category.titleEN : category.titlePT}
          </h3>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:gap-6">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col items-center gap-3 rounded-lg p-4 transition-all hover:bg-secondary 2xl:gap-4"
              >
                <div className={skill.monotone ? "dark:invert" : ""}>
                  <Icon
                    icon={skill.icon}
                    style={{ fontSize: "64px" }}
                    className="transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="text-center font-medium text-xs sm:text-sm 2xl:text-base">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export { SkillCategories };
