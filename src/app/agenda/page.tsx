import { useQuery } from "@tanstack/react-query";

import PageLayout from "@/components/page-layout";
import { QueryKeys } from "@/constants/query-keys";

import { agendaActions } from "./actions/agenda.actions";
import { Appointments } from "./components/Appointments";

function AgendaPage() {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.appointments],
    queryFn: () => agendaActions.getAppointments(),
  });

  return (
    <PageLayout title="Agenda | Mi día">
      <header>
        <h1 className="text-4xl font-bold">Agenda</h1>
      </header>
      <main>
        <Appointments />
      </main>
    </PageLayout>
  );
}

export default AgendaPage;
