import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { CreateUserView } from "../components/create-user-view";

function CreateUserPage() {
  return (
    <PageLayout title="Crear User">
      <Main className="flex-col justify-center items-center">
        <CreateUserView />
      </Main>
    </PageLayout>
  );
}

export default CreateUserPage;
