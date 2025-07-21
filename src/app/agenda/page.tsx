import PageLayout from "@/components/page-layout";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSelector } from "./components/appointment-view-selector";
import { AppoinmentDetailContainer } from "./components/detail/appoinment-detail-container";

function AgendaPage() {
  return (
    <PageLayout title="Mi Agenda">
      <AppointmentHeader />
      <main className="space-y-4 h-full overflow-y-auto flex justify-between w-full">
        <AppointmentViewSelector />
        <AppoinmentDetailContainer />
      </main>
    </PageLayout>
  );
}

export default AgendaPage;
