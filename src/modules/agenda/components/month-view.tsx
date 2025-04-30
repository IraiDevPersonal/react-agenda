import { DateHelper } from "@/lib/date-helper";
import { EventCalendar } from "@/modules/_shared/components/event-calendar";
import { Badge } from "@/modules/_shared/components/ui/badge";

const dh = new DateHelper();

type MonthViewProps = {
  date: Date;
};

export function MonthView({ date }: MonthViewProps) {
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
