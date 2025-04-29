import { EventCalendar } from "../_shared/components/event-calendar";

function AgendaPage() {
  return (
    <main className="min-h-svh w-full flex flex-col gap-4 p-4">
      <EventCalendar date={new Date()} />
    </main>
  );
}

export default AgendaPage;
