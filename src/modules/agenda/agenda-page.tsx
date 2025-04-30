import { useState } from "react";

import type { ViewTypes } from "./types/view.type";

import { AgendaHeader } from "./components/agenda-header";
import { ViewSelector } from "./components/view-selector";

function AgendaPage() {
  const [view, setView] = useState<ViewTypes>("month");
  const [date, setDate] = useState<Date>(() => new Date());

  return (
    <main className="min-h-svh w-full flex flex-col gap-4 p-4">
      <AgendaHeader
        onDateChange={setDate}
        onViewChange={setView}
        view={view}
        date={date}
      />
      <ViewSelector date={date} view={view} />
    </main>
  );
}

export default AgendaPage;
