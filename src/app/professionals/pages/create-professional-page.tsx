import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { CreateProfessionalView } from "../components/create-professional-view";

function CreateProfessionalPage() {
  return (
    <PageLayout title="Crear Profesional">
      <Main className="flex-col justify-center items-center">
        <CreateProfessionalView />
      </Main>
    </PageLayout>
  );
}

export default CreateProfessionalPage;
