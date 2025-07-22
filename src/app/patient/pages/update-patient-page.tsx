import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { PatientForm } from "../components/patient-form";

function UpdatePatientPage() {
  return (
    <PageLayout title="Pacientes">
      <Main className="flex-col justify-center items-center">
        <div className="max-w-xl">
          <PatientForm />
        </div>
      </Main>
    </PageLayout>
  );
}

export default UpdatePatientPage;
