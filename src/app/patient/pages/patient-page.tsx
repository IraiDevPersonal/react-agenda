import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { PatientTable } from "../components/patient-table";

function PatientPage() {
  return (
    <PageLayout title="Pacientes">
      <Main className="flex-col">
        <PatientTable />
      </Main>
    </PageLayout>
  );
}

export default PatientPage;
