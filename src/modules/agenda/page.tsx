import { BigAgendaCalendar } from "./components/big-agenda-calendar";

export default function AgendaPage() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
        <BigAgendaCalendar />
      </div>
    </>
  );
}
