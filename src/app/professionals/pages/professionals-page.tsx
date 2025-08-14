import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { ProfessionalHeader } from "../components/professional-header";
import { ProfessionalTable } from "../components/professional-table";
import { useMount } from "@/hooks/use-mount";
import { useStatusStore } from "@/app/appointments/stores/status-store";
import { useViewModeStore } from "@/app/appointments/stores/view-mode-store";

function ProfessionalsPage() {
  useMount(() => {
    useStatusStore.getState().setAsDefaultStatus();
    useViewModeStore.getState().setAsDefaultViewMode();
  });

  return (
    <PageLayout title="Profesionales">
      <ProfessionalHeader />
      <Main className="flex-col">
        <ProfessionalTable />
      </Main>
    </PageLayout>
  );
}

export default ProfessionalsPage;
