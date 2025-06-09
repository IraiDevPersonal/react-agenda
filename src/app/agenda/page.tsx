import PageLayout from "@/components/page-layout";

import { AppointmentViewSelector } from "./components/appointment-view-selector";

function AgendaPage() {
  return (
    <PageLayout title="Agenda | Mi día">
      <header>
        <h1 className="text-4xl font-bold">Agenda</h1>
      </header>
      <main className="space-y-4 h-full overflow-y-auto">
        <AppointmentViewSelector />
      </main>
    </PageLayout>
  );
}

export default AgendaPage;
