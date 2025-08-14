import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";
import { useMount } from "@/hooks/use-mount";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSwitch } from "./components/appointment-view-switch";
import { SheetAppointmentDetail } from "./components/detail/sheet-appointment-detail";
import { useStatusStore } from "./stores/status-store";
import { useViewModeStore } from "./stores/view-mode-store";

function AgendaPage() {
  useMount(() => {
    useStatusStore.getState().setAsDefaultStatus();
    useViewModeStore.getState().setAsDefaultViewMode();
  });

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
