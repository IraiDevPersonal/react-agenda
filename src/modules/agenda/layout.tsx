import { Outlet } from "react-router";

import { Toaster } from "@/shared/components/ui/sonner";

import { CalendarProvider } from "./components/agenda-calendar/calendar-context";

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
