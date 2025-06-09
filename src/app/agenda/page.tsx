import PageLayout from "@/components/page-layout";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSelector } from "./components/appointment-view-selector";

function AgendaPage() {
  return (
    <PageLayout title="Mi Agenda">
      <AppointmentHeader />
      <main className="space-y-4 h-full overflow-y-auto">
        <AppointmentViewSelector />
      </main>
    </PageLayout>
  );
}

export default AgendaPage;
