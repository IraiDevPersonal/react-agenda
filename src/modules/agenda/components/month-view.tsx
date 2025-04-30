import { DateHelper } from "@/lib/date-helper";
import { EventCalendar } from "@/modules/_shared/components/event-calendar";
import { Badge } from "@/modules/_shared/components/ui/badge";

import { useAgendaViewStore } from "../store/agenda-view-store";

const dh = new DateHelper();

export function MonthView() {
  const date = useAgendaViewStore(s => s.date);
  return (
    <>
      <EventCalendar
        date={date}
        renderSlot={({ day }) => {
          return (
            <>
              {dh.isEqual(day, date)
                && <Badge variant="destructive">{dh.format(day, "dd-MM-yyyy")}</Badge>}
            </>
          );
        }}
      />
    </>
  );
}
