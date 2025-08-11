import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { UpdateProfessionalView } from "../components/update-professional-view";

function UpdateProfessionalPage() {
  return (
    <PageLayout title="Editar Profesional">
      <Main className="flex-col justify-center items-center">
        <UpdateProfessionalView />
      </Main>
    </PageLayout>
  );
}

export default UpdateProfessionalPage;
