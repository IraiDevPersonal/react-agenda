import { AppSidebar } from "@/shared/components/app-sidebar";
import { BigCalendar } from "@/shared/components/big-calendar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

export default function AgendaPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
          <BigCalendar />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
