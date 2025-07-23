import { PageTitle } from "@/components/ui/page-title";

import { PatientFilters } from "./patient-filters";

function PatientHeader() {
  return (
    <header className="flex items-end justify-between w-full">
      <div>
        <PageTitle>122 Pacientes</PageTitle>
        <span className="font-semibold">Pagína: 1 de 13</span>
      </div>
      <PatientFilters />
    </header>
  );
}

export { PatientHeader };
