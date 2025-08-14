import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSwitch } from "./components/appointment-view-switch";
import { SheetAppointmentDetail } from "./components/detail/sheet-appointment-detail";

function AgendaPage() {
  return (
    <PageLayout title="Mi Agenda">
      <AppointmentHeader />
      <Main className="justify-between">
        <AppointmentViewSwitch />
      </Main>
      <SheetAppointmentDetail />
    </PageLayout>
  );
}

export default AgendaPage;
