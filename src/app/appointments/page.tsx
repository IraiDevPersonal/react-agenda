import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSelector } from "./components/appointment-view-selector";
import { AppoinmentDetailView } from "./components/detail/appoinment-detail-view";

function AgendaPage() {
  return (
    <PageLayout title="Mi Agenda">
      <AppointmentHeader />
      <Main className="justify-between">
        <AppointmentViewSelector />
        <AppoinmentDetailView />
      </Main>
    </PageLayout>
  );
}

export default AgendaPage;
