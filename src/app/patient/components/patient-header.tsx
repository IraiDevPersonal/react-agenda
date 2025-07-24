import { useQuery } from "@tanstack/react-query";

import { PageTitle } from "@/components/ui/page-title";

import { usePatientFilters } from "../hooks/use-patient-filters";
import { PatientQueryOptions } from "../queries/patient-queries";
import { PatientFilters } from "./patient-filters";

function PatientHeader() {
  const { filtersAsParams } = usePatientFilters();
  const { data: totalPatients = 0 } = useQuery(PatientQueryOptions.getTotalPatients(filtersAsParams));

  return (
    <header className="flex items-center justify-between w-full">
      <PageTitle>
        {totalPatients}
        {" "}
        Paciente
        {totalPatients > 1 ? "s" : ""}
      </PageTitle>
      <PatientFilters />
    </header>
  );
}

export { PatientHeader };
