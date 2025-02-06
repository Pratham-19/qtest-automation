import { FlaskConical, Mail, Phone, BellRing } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AppSidebar from "./shad-sidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col  bg-white antialiased">
      {/* Top Nav */}
      <nav className="fixed left-0 top-0 z-20 flex h-16 w-full items-center justify-between bg-primary px-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-white/20 p-2">
            <FlaskConical className="size-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">TestLabs</span>
        </div>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <span className="text-sm text-white/90">
            Enterprise Testing Solutions
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/20"
            >
              <BellRing className="size-5" />
              <span className="absolute right-2 top-2 size-2 animate-pulse rounded-full bg-white" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-white hover:bg-white/20"
            >
              <Mail className="size-4" />
              <span className="text-sm">Contact</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-white hover:bg-white/20"
            >
              <Phone className="size-4" />
              <span className="text-sm">Support</span>
            </Button>
          </div>

          <Avatar className="size-8 border-2 border-white/20">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-white/20 text-white">
              SG
            </AvatarFallback>
          </Avatar>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="mt-16 flex h-[calc(100vh-4rem)] overflow-hidden bg-[#F4F4F4]">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="h-full overflow-scroll rounded-lg bg-white p-6 shadow-sm">
              <SidebarTrigger />
              {children}
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
