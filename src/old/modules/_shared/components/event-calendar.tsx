import type { ReactNode } from "react";

import { Plus } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

import { dateHelper } from "@/lib/date-helper";
import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const DAY_OF_WEEK = [
  { name: "Lunes", shortName: "Lun" },
  { name: "Martes", shortName: "Mar" },
  { name: "Miércoles", shortName: "Mié" },
  { name: "Jueves", shortName: "Jue" },
  { name: "Viernes", shortName: "Vie" },
  { name: "Sábado", shortName: "Sáb" },
  { name: "Domingo", shortName: "Dom" },
] as const;

const CalendarHeader = memo(() => {
  return (
    <>
      {DAY_OF_WEEK.map(day => (
        <div key={day.name} className="p-2 text-center font-bold border-b">
          <span className="hidden lg:inline">{day.name}</span>
          <span className="inline lg:hidden">{day.shortName}</span>
        </div>
      ))}
    </>
  );
});

type CalendarDayProps = {
  renderSlot?: (props: { day: Date }) => ReactNode;
  onDayClick?: (date: Date) => void;
  monthStart: Date;
  day: Date;
};

const CalendarDay = memo(({ day, monthStart, onDayClick, renderSlot }: CalendarDayProps) => {
  const dayStatus = useMemo(() => {
    const isDayInCurrentMonth = dateHelper.isSameMonth(day, monthStart);
    const isSunday = dateHelper.isSunday(day);
    const isDayHoliday = dateHelper.isHoliday(day);
    const isDisabled = !isDayInCurrentMonth || isSunday || isDayHoliday;
    const isCurrentDay = dateHelper.isToday(day);

    return {
      isDayInCurrentMonth,
      isSunday,
      isDayHoliday,
      isDisabled,
      isCurrentDay,
    };
  }, [day, monthStart]);

  const handleClick = useCallback(() => {
    if (!dayStatus.isDisabled && onDayClick) {
      onDayClick(day);
    }
  }, [day, dayStatus.isDisabled, onDayClick]);

  return (
    <div
      className={cn(
        "min-h-[120px] p-2 border-b border-r last:border-r-0 relative",
        dayStatus.isDisabled && "bg-muted/40 text-muted-foreground/60",
      )}
      onClick={handleClick}
      role="button"
      tabIndex={dayStatus.isDisabled ? -1 : 0}
      aria-disabled={dayStatus.isDisabled}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className={cn(
            "text-xs font-normal h-5 flex items-center justify-center",
            dayStatus.isCurrentDay && "w-5 bg-primary text-primary-foreground rounded-md font-bold",
          )}
          >
            {dateHelper.format(day, "d")}
          </span>
        </div>
        <div className="flex space-x-1">
          {!dayStatus.isDisabled && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={(e) => {
                e.stopPropagation();
                onDayClick?.(day);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
          {dayStatus.isDayHoliday && (
            <Badge
              variant="default"
              className="bg-destructive/10 text-destructive font-normal"
            >
              Feriado
            </Badge>
          )}
        </div>
      </div>

      {!dayStatus.isDisabled && (
        <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
          {renderSlot?.({ day })}
        </div>
      )}
    </div>
  );
});

type EventCalendarProps = {
  date: Date;
} & Pick<CalendarDayProps, "onDayClick" | "renderSlot">;

export const EventCalendar = memo(({ date, ...props }: EventCalendarProps) => {
  const monthStart = useMemo(() => dateHelper.startOfMonth(date), [date]);

  const calendarDays = useMemo(() => {
    const generateCalendarDays = (date: Date) => {
      const monthStart = dateHelper.startOfMonth(date);
      const monthEnd = dateHelper.endOfMonth(date);
      const startDate = dateHelper.startOfWeek(monthStart, { weekStartsOn: 1 });
      const endDate = dateHelper.endOfWeek(monthEnd, { weekStartsOn: 1 });
      return dateHelper.eachDayOfInterval({ start: startDate, end: endDate });
    };

    return generateCalendarDays(date);
  }, [date]);

  return (
    <>
      <div className="grid grid-cols-7 rounded-lg overflow-hidden border">
        <CalendarHeader />
        {calendarDays.map(day => (
          <CalendarDay
            key={dateHelper.format(day, "yyyy-MM-dd")}
            monthStart={monthStart}
            day={day}
            {...props}
          />
        ))}
      </div>
    </>
  );
});
