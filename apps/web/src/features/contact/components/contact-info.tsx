import {
  pages_contact_info_availability,
  pages_contact_info_availabilityValue,
  pages_contact_info_location,
  pages_contact_info_locationValue,
  pages_contact_info_phone,
  pages_contact_info_workPreference,
  pages_contact_info_workPreferenceValue,
} from "@repo/i18n/messages";
import { getLocale } from "@repo/i18n/runtime";
import { trackContactLink } from "@repo/shared/utilities/analytics";
import { Card, CardContent } from "@repo/ui/shadcn/card";
import { Briefcase, Clock, Globe, Mail, MapPin } from "lucide-react";

function ContactInfo() {
  const locale = getLocale();

  return (
    <Card className="gap-0 border-2 py-0 shadow-none">
      <CardContent className="space-y-4 p-6 sm:p-8 2xl:space-y-5 2xl:p-10">
        <div className="flex items-start gap-4 2xl:gap-5">
          <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary 2xl:h-6 2xl:w-6" />
          <div>
            <h3 className="font-semibold 2xl:text-lg">{pages_contact_info_location()}</h3>
            <p className="text-muted-foreground text-sm 2xl:text-base">
              Manaus, Amazonas, {pages_contact_info_locationValue()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 2xl:gap-5">
          <Clock className="mt-1 h-5 w-5 shrink-0 text-primary 2xl:h-6 2xl:w-6" />
          <div>
            <h3 className="font-semibold 2xl:text-lg">{pages_contact_info_availability()}</h3>
            <p className="text-muted-foreground text-sm 2xl:text-base">
              {pages_contact_info_availabilityValue()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 2xl:gap-5">
          <Briefcase className="mt-1 h-5 w-5 shrink-0 text-primary 2xl:h-6 2xl:w-6" />
          <div>
            <h3 className="font-semibold 2xl:text-lg">{pages_contact_info_workPreference()}</h3>
            <p className="text-muted-foreground text-sm 2xl:text-base">
              {pages_contact_info_workPreferenceValue()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 2xl:gap-5">
          <Mail className="mt-1 h-5 w-5 shrink-0 text-primary 2xl:h-6 2xl:w-6" />
          <div>
            <h3 className="font-semibold 2xl:text-lg">Email</h3>
            <a
              href="mailto:lucascastro.a99@gmail.com"
              className="text-muted-foreground text-sm transition-colors hover:text-primary 2xl:text-base"
              data-umami-event="contact-link-click"
              data-umami-event-link="email"
              onClick={() => trackContactLink("email")}
            >
              lucascastro.a99@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 2xl:gap-5">
          <Globe className="mt-1 h-5 w-5 shrink-0 text-primary 2xl:h-6 2xl:w-6" />
          <div>
            <h3 className="font-semibold 2xl:text-lg">{pages_contact_info_phone()}</h3>
            <a
              href="tel:+5592981638283"
              className="text-muted-foreground text-sm transition-colors hover:text-primary 2xl:text-base"
              data-umami-event="contact-link-click"
              data-umami-event-link="phone"
              onClick={() => trackContactLink("phone")}
            >
              {locale === "pt" ? "(92) 9 8163-8283" : "+55 (92) 9 8163-8283"}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ContactInfo };
