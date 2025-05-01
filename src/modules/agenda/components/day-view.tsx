import { DayCalendar } from "@/modules/_shared/components/day-calendar";

import { useAgendaViewStore } from "../store/agenda-view-store";

export function DayView() {
  const date = useAgendaViewStore(s => s.date);
  return (
    <>
      <DayCalendar date={date} />
    </>
  );
}
