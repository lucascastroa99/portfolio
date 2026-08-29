import { AppFooter } from "#components/app-footer";
import { AppHeader } from "#components/app-header";

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: Readonly<AppLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}

export type { AppLayoutProps };
export { AppLayout };
