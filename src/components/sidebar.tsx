"use client";
import {
  BarChart4,
  AlertTriangle,
  Workflow,
  Plus,
  Home,
  BrainCircuit,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: BrainCircuit,
    label: "Qurk Chat",
    href: "/qurk-chat",
  },
  {
    icon: Workflow,
    label: "Workflow Management",
    subItems: [
      {
        icon: Plus,
        label: "Add Workflow",
        href: "/workflow/create",
      },
      {
        icon: BarChart4,
        label: "View Workflows",
        href: "/workflow/view",
      },
    ],
  },
  {
    icon: AlertTriangle,
    label: "Escalation Analysis",
    href: "/escalation-analysis",
  },
];

export default function PowerPredictSidebar() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200 pt-16 shadow-none"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>PowerPredict AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {!item.subItems ? (
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="">
                        <div>
                          <item.icon className="size-5" />
                        </div>
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  ) : (
                    <Collapsible className="group/collapsible w-full">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex size-5 items-center justify-center">
                              <item.icon className="size-5" />
                            </div>
                            <span>{item.label}</span>
                          </div>
                          <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <a
                                href={subItem.href}
                                className="flex items-center gap-3 py-2 pl-3"
                              >
                                <div className="flex size-4 items-center justify-center">
                                  <subItem.icon className="size-4" />
                                </div>
                                <span>{subItem.label}</span>
                              </a>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Toggle Sidebar Button */}
        <SidebarFooter className="mt-auto p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="w-full hover:bg-slate-100"
              >
                {open ? (
                  <ChevronsLeft className="size-5 text-slate-500" />
                ) : (
                  <ChevronsRight className="size-5 text-slate-500" />
                )}
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
