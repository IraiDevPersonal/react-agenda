import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { UpdatePatientView } from "../components/update-patient-view";

function UpdatePatientPage() {
  return (
    <PageLayout title="Editar Paciente">
      <Main className="flex-col justify-center items-center">
        <UpdatePatientView />
      </Main>
    </PageLayout>
  );
}

export default UpdatePatientPage;
