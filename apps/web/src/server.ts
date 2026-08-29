import { paraglideMiddleware } from "@repo/i18n/server";
import handler from "@tanstack/react-start/server-entry";

export default {
  fetch(req: Request): Promise<Response> {
    // TanStack Router handles URL localization via deLocalizeUrl/localizeUrl,
    // so we pass the original `req` to avoid redirect loops.
    return paraglideMiddleware(req, () => handler.fetch(req));
  },
};
