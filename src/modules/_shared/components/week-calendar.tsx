import type { ReactNode } from "react";

import { memo, useMemo } from "react";

import { dateHelper } from "@/lib/date-helper";
import { cn } from "@/lib/utils";

type DayHeaderProps = {
  day: Date;
};

const DayHeader = memo(({ day }: DayHeaderProps) => {
  const isSunday = dateHelper.isSunday(day);
  const isDayHoliday = dateHelper.isHoliday(day);
  const isDisabled = isSunday || isDayHoliday;

  return (
    <div
      className={cn(
        "p-2 text-center font-medium",
        isDisabled && "bg-muted-foreground/5",
      )}
    >
      <div className={cn(isSunday && "text-muted-foreground", isDayHoliday && "text-destructive/60")}>
        {dateHelper.format(day, "EEE dd")}
      </div>
    </div>
  );
});

DayHeader.displayName = "DayHeader";

type TimeSlotProps = {
  renderSlot?: (props: { day: Date }) => ReactNode;
  hour: number;
  day: Date;
};

const TimeSlot = memo(({ day, hour: _hour, renderSlot }: TimeSlotProps) => {
  const isSunday = dateHelper.isSunday(day);
  const isDayHoliday = dateHelper.isHoliday(day);
  const isDisabled = isSunday || isDayHoliday;

  return (
    <div
      className={cn(
        "p-2 min-h-[60px] relative border-r last:border-r-0",
        !isDisabled && "hover:bg-muted-foreground/15 cursor-pointer transition-colors",
        isDisabled && "bg-muted-foreground/5",
      )}
    >
      {isDisabled ? "" : renderSlot?.({ day })}
    </div>
  );
});

TimeSlot.displayName = "TimeSlot";

type TimeRowProps = {
  daysInWeek: Date[];
  hour: number;
} & Pick<TimeSlotProps, "renderSlot">;

const TimeRow = memo(({ hour, daysInWeek, ...props }: TimeRowProps) => (
  <div className="grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b last:border-b-0 odd:bg-muted-foreground/5">
    <div className="p-2 font-bold border-r flex items-center justify-end">
      <span>
        {hour}
        :00
      </span>
    </div>
    {daysInWeek.map(day => (
      <TimeSlot
        key={`${dateHelper.format(day, "yyyy-MM-dd")}-${hour}`}
        day={day}
        hour={hour}
        {...props}
      />
    ))}
  </div>
));

TimeRow.displayName = "TimeRow";

type WeekCalendarProps = {
  date: Date;
} & Pick<TimeSlotProps, "renderSlot">;

export function WeekCalendar({ date, ...props }: WeekCalendarProps) {
  const { daysInWeek, hours } = useMemo(() => {
    const weekStart = dateHelper.startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = dateHelper.endOfWeek(date, { weekStartsOn: 1 });
    const daysInWeek = dateHelper.eachDayOfInterval({ start: weekStart, end: weekEnd });
    const hours = Array.from({ length: 13 }, (_, i) => i + 8);

    return { daysInWeek, hours };
  }, [date]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b">
        <div className="p-2 font-bold border-r text-right">
          Bloque
        </div>
        {daysInWeek.map(day => (
          <DayHeader
            key={dateHelper.format(day, "yyyy-MM-dd")}
            day={day}
          />
        ))}
      </div>

      <div>
        {hours.map(hour => (
          <TimeRow
            key={`hour-${hour}`}
            daysInWeek={daysInWeek}
            hour={hour}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}
