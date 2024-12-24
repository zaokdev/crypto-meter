import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSideBar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="lg:grid lg:grid-cols-8 flex flex-col lg:gap-6 w-full px-4">
        <SidebarTrigger className="absolute" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
