import PowerProtectSidebar from "./sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./navbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white antialiased">
      {/* Top Nav - Fixed height */}
      <Navbar />

      {/* Main Layout - Takes remaining height */}
      <div className="flex flex-1 overflow-hidden bg-[#F4F4F4]">
        <SidebarProvider>
          <PowerProtectSidebar />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
}
