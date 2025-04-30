import type { ReactNode } from "react";

import { Plus } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

import { DateHelper } from "@/lib/date-helper";
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

const dh = new DateHelper();

const CalendarHeader = memo(() => {
  return (
    <>
      {DAY_OF_WEEK.map(day => (
        <div key={day.name} className="p-2 lg:p-4 text-center font-bold border-b">
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
    const isDayInCurrentMonth = dh.isSameMonth(day, monthStart);
    const isSunday = dh.format(day, "E") === "Sun";
    const isDayHoliday = dh.isHoliday(day);
    const isDisabled = !isDayInCurrentMonth || isSunday || isDayHoliday;
    const isCurrentDay = dh.isToday(day);

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
            {dh.format(day, "d")}
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
  const monthStart = useMemo(() => dh.startOfMonth(date), [date]);

  const calendarDays = useMemo(() => {
    const generateCalendarDays = (date: Date) => {
      const monthStart = dh.startOfMonth(date);
      const monthEnd = dh.endOfMonth(date);
      const startDate = dh.startOfWeek(monthStart, { weekStartsOn: 1 });
      const endDate = dh.endOfWeek(monthEnd, { weekStartsOn: 1 });
      return dh.eachDayOfInterval({ start: startDate, end: endDate });
    };

    return generateCalendarDays(date);
  }, [date]);

  return (
    <>
      <div className="grid grid-cols-7 rounded-lg overflow-hidden border">
        <CalendarHeader />
        {calendarDays.map(day => (
          <CalendarDay
            key={dh.format(day, "yyyy-MM-dd")}
            monthStart={monthStart}
            day={day}
            {...props}
          />
        ))}
      </div>
    </>
  );
});

// const [view, setView] = useState<"day" | "week" | "month" | "agenda">("month");
// const monthEnd = dh.endOfMonth(date);
// Modificar la generación de días para que la semana comience el lunes

// const nextMonth = () => setCurrentDate(addMonths(date, 1));
// const prevMonth = () => setCurrentDate(subMonths(date, 1));
// const goToToday = () => setCurrentDate(new Date());

// Manejar cambio de vista
// const handleViewChange = (newView: string) => {
//   if (newView === "day" || newView === "week" || newView === "month" || newView === "agenda") {
//     setView(newView);
//     onViewChange(newView);
//   }
// };

// {/* <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" onClick={goToToday}>
//             Hoy
//           </Button>
//           <Button variant="outline" size="icon" onClick={prevMonth}>
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon" onClick={nextMonth}>
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//           <h2 className="text-xl font-bold">{dh.format(date, "MMMM yyyy", { locale: es })}</h2>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Select value={view} onValueChange={handleViewChange}>
//             <SelectTrigger className="w-[100px]">
//               <SelectValue placeholder="Vista" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="day">Día</SelectItem>
//               <SelectItem value="week">Semana</SelectItem>
//               <SelectItem value="month">Mes</SelectItem>
//               <SelectItem value="agenda">Agenda</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button onClick={() => openNewAppointment(new Date())}>Nueva cita</Button>
//         </div>
//       </div> */}
