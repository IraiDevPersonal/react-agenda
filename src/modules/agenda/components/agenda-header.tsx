import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { DateHelper } from "@/lib/date-helper";
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

const dh = new DateHelper();

export function AgendaHeader() {
  // const monthEnd = dh.endOfMonth(date);
  const { view, date, setView, setDate } = useAgendaViewStore();

  const handleDateChange = (value: "next" | "prev" | "to-day") => () => {
    const hash: Record<ViewTypes, Record<typeof value, any>> = {
      agenda: {
        "to-day": null,
        "next": null,
        "prev": null,
      },
      day: {
        "to-day": null,
        "next": null,
        "prev": null,
      },
      month: {
        "to-day": () => setDate(new Date()),
        "next": () => setDate(dh.addMonths(date, 1)),
        "prev": () => setDate(dh.subMonths(date, 1)),
      },
      week: {
        "to-day": () => setDate(new Date()),
        "next": () => setDate(dh.addWeeks(date, 1)),
        "prev": () => setDate(dh.subWeeks(date, 1)),
      },
    };

    hash[view][value]();
  };

  const handleViewChange = (newView: string) => {
    if (newView === "day" || newView === "week" || newView === "month" || newView === "agenda") {
      setView(newView);
    }
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={handleDateChange("to-day")} disabled={dh.isToday(date)}>
          Hoy
        </Button>
        <Button variant="outline" size="icon" onClick={handleDateChange("prev")}>
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleDateChange("next")}>
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
            {
              OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))
            }
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
