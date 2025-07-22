import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSelector } from "./components/appointment-view-selector";
import { AppoinmentDetailContainer } from "./components/detail/appoinment-detail-container";

function AgendaPage() {
  return (
    <PageLayout title="Mi Agenda">
      <AppointmentHeader />
      <Main className="justify-between">
        <AppointmentViewSelector />
        <AppoinmentDetailContainer />
      </Main>
    </PageLayout>
  );
}

export default AgendaPage;
