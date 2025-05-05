import { dateHelper } from "@/lib/date-helper";
import { Badge } from "@/old/modules/_shared/components/ui/badge";
import { WeekCalendar } from "@/old/modules/_shared/components/week-calendar";

import { useAgendaViewStore } from "../store/agenda-view-store";

export function WeekView() {
  const date = useAgendaViewStore(s => s.date);
  return (
    <>
      <WeekCalendar
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
