import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { DateHelper } from "@/lib/date-helper";
import { Button } from "@/modules/_shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/_shared/components/ui/select";

import { useAgendaViewStore } from "../store/agenda-view-store";

const dh = new DateHelper();

export function AgendaHeader() {
  // const monthEnd = dh.endOfMonth(date);
  const { view, date, setView, setDate } = useAgendaViewStore();

  const nextMonth = () => setDate(dh.addMonths(date, 1));
  const prevMonth = () => setDate(dh.subMonths(date, 1));
  const goToToday = () => setDate(new Date());

  const handleViewChange = (newView: string) => {
    if (newView === "day" || newView === "week" || newView === "month" || newView === "agenda") {
      setView(newView);
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
