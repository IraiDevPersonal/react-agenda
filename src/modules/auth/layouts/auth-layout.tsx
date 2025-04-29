import { Outlet } from "react-router";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from "@/modules/_shared/components/ui/sidebar";

function AuthLayout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-2xl font-bold">Agenda</h1>
        </SidebarHeader>
        <SidebarContent>
          cositas
        </SidebarContent>
        <SidebarFooter>
          usuario
        </SidebarFooter>
      </Sidebar>
      <Outlet />
    </SidebarProvider>
  );
}

export default AuthLayout;
