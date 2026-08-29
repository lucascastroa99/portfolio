import type { LucideIcon } from "lucide-react";
import { ChevronRightIcon, X } from "lucide-react";
import { AppLogo } from "#components/app-logo";
import { Button } from "#components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "#components/ui/sidebar";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavItem[];
}

interface AppSidebarProps {
  items: NavItem[];
  footer?: React.ReactNode;
  activeUrl?: string;
}

export function AppSidebar({ items, footer, activeUrl }: Readonly<AppSidebarProps>) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:px-0">
          <AppLogo subtitle="Initial App" />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto size-7 shrink-0"
              onClick={() => setOpenMobile(false)}
            >
              <X className="size-4" />
              <span className="sr-only">Close Menu</span>
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={item.url === "/"}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={activeUrl?.startsWith(item.url)}
                      tooltip={item.title}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.items?.length && (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="text-sidebar-foreground/70">
                            <ChevronRightIcon className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={activeUrl?.startsWith(subItem.url)}
                                >
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
}
