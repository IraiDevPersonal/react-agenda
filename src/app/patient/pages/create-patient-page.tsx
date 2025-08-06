import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { CreatePatientView } from "../components/create-patient-view";

function CreatePatientPage() {
  return (
    <PageLayout title="Crear Paciente">
      <Main className="flex-col justify-center items-center">
        <CreatePatientView />
      </Main>
    </PageLayout>
  );
}

export default CreatePatientPage;
