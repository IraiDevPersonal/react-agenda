import { useParams } from "react-router";

import PageLayout from "@/components/page-layout";

import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSelector } from "./components/appointment-view-selector";
import { AppointmentDetail } from "./components/detail/appointment-detail";

function AgendaPage() {
  const { appointmentId } = useParams();
  return (
    <PageLayout title="Mi Agenda">
      <AppointmentHeader />
      <main className="space-y-4 h-full overflow-y-auto flex w-full">
        <AppointmentViewSelector />

        {appointmentId && (
          <AppointmentDetail appointmentId={appointmentId} />
        )}
      </main>
    </PageLayout>
  );
}

export default AgendaPage;
