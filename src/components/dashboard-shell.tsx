import AppSidebar from "./sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-background to-background/95">
      <AppSidebar />
      <main className="ml-16 flex-1 p-8 pt-16">{children}</main>
      {/* </SidebarProvider> */}
    </div>
  );
}
