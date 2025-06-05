import { Outlet } from "react-router";

import { Sidebar } from "@/components/ui/sidebar";

function Layout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Layout;
