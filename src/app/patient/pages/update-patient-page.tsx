import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { UpdatePatientPresenter } from "../components/update-patient-presenter";

function UpdatePatientPage() {
  return (
    <PageLayout title="Editar Paciente">
      <Main className="flex-col justify-center items-center">
        <UpdatePatientPresenter />
      </Main>
    </PageLayout>
  );
}

export default UpdatePatientPage;
