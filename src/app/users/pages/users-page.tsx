import { useStatusStore } from "@/app/appointments/stores/status-store";
import { useViewModeStore } from "@/app/appointments/stores/view-mode-store";
import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";
import { useMount } from "@/hooks/use-mount";

import { UserHeader } from "../components/user-header";
import { UserTable } from "../components/user-table";

function UsersPage() {
  useMount(() => {
    useStatusStore.getState().setAsDefaultStatus();
    useViewModeStore.getState().setAsDefaultViewMode();
  });

  return (
    <PageLayout title="Users">
      <UserHeader />
      <Main className="flex-col">
        <UserTable />
      </Main>
    </PageLayout>
  );
}

export default UsersPage;
