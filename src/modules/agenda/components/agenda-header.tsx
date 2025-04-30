import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { DateHelper } from "@/lib/date-helper";
import { Button } from "@/modules/_shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/_shared/components/ui/select";

import type { ViewTypes } from "../types/view.type";

const dh = new DateHelper();

type AgendaHeaderProps = {
  onViewChange: (view: ViewTypes) => void;
  onDateChange: (date: Date) => void;
  view: ViewTypes;
  date: Date;
};

export function AgendaHeader({ date, view, onDateChange, onViewChange }: AgendaHeaderProps) {
  // const monthEnd = dh.endOfMonth(date);

  const nextMonth = () => onDateChange(dh.addMonths(date, 1));
  const prevMonth = () => onDateChange(dh.subMonths(date, 1));
  const goToToday = () => onDateChange(new Date());

  const handleViewChange = (newView: string) => {
    if (newView === "day" || newView === "week" || newView === "month" || newView === "agenda") {
      onViewChange(newView);
    }
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={goToToday} disabled={dh.isToday(date)}>
          Hoy
        </Button>
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="size-4" />
        </Button>
        <h2 className="text-xl font-bold capitalize">{dh.format(date, "MMMM yyyy")}</h2>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={view} onValueChange={handleViewChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Vista" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Mes</SelectItem>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="day">Día</SelectItem>
            <SelectItem value="agenda">Agenda</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Plus />
          Nueva cita
        </Button>
      </div>
    </header>
  );
}
