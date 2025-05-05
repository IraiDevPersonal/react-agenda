import { Outlet } from "react-router";

import { CalendarProvider } from "@/shared/components/event-calendar/calendar-context";
import { Toaster } from "@/shared/components/ui/sonner";

export default function AgendaLayout() {
  return (
    <>
      <CalendarProvider>
        <Outlet />
      </CalendarProvider>
      <Toaster />
    </>
  );
}
