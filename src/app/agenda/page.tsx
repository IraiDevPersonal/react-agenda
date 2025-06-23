import { useParams } from "react-router";

import PageLayout from "@/components/page-layout";

import { AppointmentDetail } from "./components/appointment-detail";
import { AppointmentHeader } from "./components/appointment-header";
import { AppointmentViewSelector } from "./components/appointment-view-selector";

function AgendaPage() {
  const { appointmentId } = useParams();
  return (
    <PageLayout title="Mi Agenda">
      <AppointmentHeader />
      <main className="space-y-4 h-full overflow-y-auto flex">
        <AppointmentViewSelector />

        {appointmentId && (
          <AppointmentDetail appointmentId={appointmentId} />
        )}
      </main>
    </PageLayout>
  );
}

export default AgendaPage;
