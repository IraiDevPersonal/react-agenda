import PageLayout from "@/components/page-layout";
import { Main } from "@/components/ui/main";

import { ProfessionalHeader } from "../components/professional-header";
import { ProfessionalTable } from "../components/professional-table";

function ProfessionalPage() {
  return (
    <PageLayout title="Profesionales">
      <ProfessionalHeader />
      <Main className="flex-col">
        <ProfessionalTable />
      </Main>
    </PageLayout>
  );
}

export default ProfessionalPage;
