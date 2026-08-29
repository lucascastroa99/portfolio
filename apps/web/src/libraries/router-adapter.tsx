import { useProgress } from "@repo/ui/providers/progress-provider";
import { useEffect } from "react";
import type { getRouter } from "@/router";

export interface RouterAdapterProps {
  router: ReturnType<typeof getRouter>;
}

export function RouterAdapter({ router }: Readonly<RouterAdapterProps>): null {
  const { start, stop } = useProgress();

  useEffect(() => {
    const unsubscribeFromNavigationStart = router.subscribe("onBeforeNavigate", () => start());
    const unsubscribeFromNavigationEnd = router.subscribe("onResolved", () => stop());

    return () => {
      unsubscribeFromNavigationStart();
      unsubscribeFromNavigationEnd();
    };
  }, [router, start, stop]);

  return null;
}
