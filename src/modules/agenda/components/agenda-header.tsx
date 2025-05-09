import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useCallback } from "react";

import { dateHelper } from "@/lib/date-helper";
import { Button } from "@/modules/_shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/_shared/components/ui/select";

import type { ViewTypes } from "../types/view.type";

import { useAgendaViewStore } from "../store/agenda-view-store";

const OPTIONS: { value: ViewTypes; label: string }[] = [
  { value: "month", label: "Mes" },
  { value: "week", label: "Semana" },
  { value: "day", label: "Día" },
  { value: "agenda", label: "Agenda" },
] as const;

function generateTitle(date: Date, view: ViewTypes) {
  const hash: Record<ViewTypes, string> = {
    agenda: dateHelper.format(date, "MMMM yyyy"),
    day: dateHelper.format(date, "EEEE d 'de' MMMM, yyyy"),
    month: dateHelper.format(date, "MMMM yyyy"),
    week: dateHelper.format(dateHelper.endOfWeek(date, { weekStartsOn: 1 }), "MMMM yyyy"),
  };
  return hash[view];
}

export function AgendaHeader() {
  const { view, date, setView, setDate } = useAgendaViewStore();

  const handleDateChange = (value: "next" | "prev" | "today") => () => {
    const hash: Record<ViewTypes, Record<typeof value, any>> = {
      agenda: {
        today: null,
        next: null,
        prev: null,
      },
      day: {
        today: setDate(new Date()),
        next: setDate(dateHelper.addDays(date, 1)),
        prev: setDate(dateHelper.subDays(date, 1)),
      },
      month: {
        today: () => setDate(new Date()),
        next: () => setDate(dateHelper.addMonths(date, 1)),
        prev: () => setDate(dateHelper.subMonths(date, 1)),
      },
      week: {
        today: () => setDate(new Date()),
        next: () => setDate(dateHelper.addWeeks(date, 1)),
        prev: () => setDate(dateHelper.subWeeks(date, 1)),
      },
    };

    hash[view][value]();
  };

  const handleViewChange = useCallback((newView: string) => {
    if (newView === "day" || newView === "week" || newView === "month" || newView === "agenda") {
      setView(newView);
    }
  }, [setView]);

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={handleDateChange("today")} disabled={dateHelper.isToday(date)}>
          Hoy
        </Button>
        <Button variant="outline" size="icon" onClick={handleDateChange("prev")}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleDateChange("next")}>
          <ChevronRight className="size-4" />
        </Button>
        <h2 className="text-xl font-bold capitalize">{generateTitle(date, view)}</h2>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={view} onValueChange={handleViewChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Vista" />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
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
