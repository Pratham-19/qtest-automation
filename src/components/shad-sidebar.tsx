import {
  LayoutDashboard,
  Search,
  GitMerge,
  AlertTriangle,
  BrainCircuit,
  ArrowUpRightSquare,
  Plus,
  Code2,
  Bug,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Search,
    label: "Test Analysis",
    subItems: [
      {
        icon: GitMerge,
        label: "Similar Tests",
        href: "/analysis/similar",
      },
      {
        icon: Code2,
        label: "Redundancy Check",
        href: "/analysis/redundant",
      },
    ],
  },
  {
    icon: BrainCircuit,
    label: "AI Enhancement",
    subItems: [
      {
        icon: Sparkles,
        label: "Auto Complete",
        href: "/enhancement/auto-complete",
      },
      {
        icon: AlertTriangle,
        label: "Risk Analysis",
        href: "/enhancement/risk",
      },
    ],
  },
  {
    icon: Bug,
    label: "Test Management",
    subItems: [
      {
        icon: ArrowUpRightSquare,
        label: "Escalations",
        href: "/management/escalation",
      },
      {
        icon: Bug,
        label: "Bug Relevancy",
        href: "/management/bugs",
      },
    ],
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="pt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Test Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {!item.subItems ? (
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center">
                          <item.icon className="size-5" />
                        </div>
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  ) : (
                    <Collapsible
                      defaultOpen
                      className="group/collapsible w-full"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center">
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
                                className="flex items-center gap-3 py-2 pl-8"
                              >
                                <div className="flex h-4 w-4 items-center justify-center">
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

        {/* Footer - Create New Test Button */}
        <div className="mt-auto border-t p-4">
          <Button variant="outline" className="w-full justify-start gap-3">
            <div className="flex h-5 w-5 items-center justify-center">
              <Plus className="size-5" />
            </div>
            <span>Create new test</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
