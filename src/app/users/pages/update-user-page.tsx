import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { UpdateUserView } from "../components/update-user-view";

function UpdateUserPage() {
  return (
    <PageLayout title="Editar User">
      <Main className="flex-col justify-center items-center">
        <UpdateUserView />
      </Main>
    </PageLayout>
  );
}

export default UpdateUserPage;
