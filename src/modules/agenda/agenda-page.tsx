import { AgendaHeader } from "./components/agenda-header";
import { ViewSelector } from "./components/view-selector";

export default function AgendaPage() {
  return (
    <main className="min-h-svh w-full flex flex-col gap-4 p-4">
      <AgendaHeader />
      <ViewSelector />
    </main>
  );
}
