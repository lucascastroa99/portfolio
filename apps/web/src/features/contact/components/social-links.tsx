import { Icon } from "@iconify-icon/react";
import tallyLogo from "@repo/assets/images/tally-logo.png";
import { pages_contact_social } from "@repo/i18n/messages";
import { getLocale } from "@repo/i18n/runtime";
import { SOCIAL_LINKS, TALLY_FORMS } from "@repo/shared/constants/social-links";
import type { ContactLinkName } from "@repo/shared/utilities/analytics";
import { trackContactLink } from "@repo/shared/utilities/analytics";
import { useTheme } from "@repo/ui/providers/theme-provider";
import { Card, CardContent, CardTitle } from "@repo/ui/shadcn/card";
import { useEffect, useState } from "react";

function TallyLink() {
  const locale = getLocale();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isTallyFormEnglish = locale === "en";
  const isTallyFormLight = mounted ? theme === "light" : true;

  const selectedTallyForm = TALLY_FORMS.find(
    (form) => form.isEnglish === isTallyFormEnglish && form.isLight === isTallyFormLight,
  );
  const contactFormUrl = selectedTallyForm?.code || TALLY_FORMS[0].code;

  return (
    <a
      href={`https://tally.so/r/${contactFormUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary hover:bg-secondary 2xl:gap-4 2xl:p-5"
      data-umami-event="contact-link-click"
      data-umami-event-link="tally"
      onClick={() => trackContactLink("tally")}
    >
      <div className="h-fit w-fit">
        <img src={tallyLogo} alt="Tally" width={42} height={42} />
      </div>
      <span className="font-medium 2xl:text-lg">Tally</span>
    </a>
  );
}

function SocialLinks() {
  return (
    <Card className="gap-0 border-2 py-0 shadow-none">
      <CardContent className="space-y-4 p-6 sm:p-8 2xl:space-y-5 2xl:p-10">
        <CardTitle className="2xl:text-2xl">{pages_contact_social()}</CardTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:gap-5">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary hover:bg-secondary 2xl:gap-4 2xl:p-5"
              data-umami-event="contact-link-click"
              data-umami-event-link={social.name.toLowerCase()}
              onClick={() => trackContactLink(social.name.toLowerCase() as ContactLinkName)}
            >
              <div className={social.monotone ? "dark:invert" : ""} style={{ height: "40px" }}>
                <Icon icon={social.icon} style={{ fontSize: "40px" }} />
              </div>
              <span className="font-medium 2xl:text-lg">{social.name}</span>
            </a>
          ))}
          <TallyLink />
        </div>
      </CardContent>
    </Card>
  );
}

export { SocialLinks, TallyLink };
