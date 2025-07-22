import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { PatientHeader } from "../components/patient-header";
import { PatientTable } from "../components/patient-table";

function PatientPage() {
  return (
    <PageLayout title="Pacientes">
      <PatientHeader />
      <Main className="flex-col">
        <PatientTable />
      </Main>
    </PageLayout>
  );
}

export default PatientPage;
