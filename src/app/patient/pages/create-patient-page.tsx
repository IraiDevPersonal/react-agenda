import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { CreatePatientPresenter } from "../components/create-patient-presenter";

function CreatePatientPage() {
  return (
    <PageLayout title="Pacientes">
      <Main className="flex-col justify-center items-center">
        <CreatePatientPresenter />
      </Main>
    </PageLayout>
  );
}

export default CreatePatientPage;
