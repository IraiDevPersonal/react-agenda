import { dateHelper } from "@/lib/date-helper";
import { EventCalendar } from "@/modules/_shared/components/event-calendar";
import { Badge } from "@/modules/_shared/components/ui/badge";

import { useAgendaViewStore } from "../store/agenda-view-store";

export function MonthView() {
  const date = useAgendaViewStore(s => s.date);
  return (
    <>
      <EventCalendar
        date={date}
        renderSlot={({ day }) => {
          return (
            <>
              {dateHelper.isEqual(day, date)
                && <Badge variant="destructive">{dateHelper.format(day, "dd-MM-yyyy")}</Badge>}
            </>
          );
        }}
      />
    </>
  );
}
