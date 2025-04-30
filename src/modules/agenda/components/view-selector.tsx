import { useAgendaViewStore } from "../store/agenda-view-store";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";

export function ViewSelector() {
  const view = useAgendaViewStore(s => s.view);
  return (
    <>
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
    </>
  );
}
