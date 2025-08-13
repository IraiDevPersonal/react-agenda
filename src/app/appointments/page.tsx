import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";
import { useMount } from "@/hooks/use-mount";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSelector } from "./components/appointment-view-selector";
import { AppoinmentDetailView } from "./components/detail/appoinment-detail-view";
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
        <AppointmentViewSelector />
        <AppoinmentDetailView />
      </Main>
    </PageLayout>
  );
}

export default AgendaPage;
