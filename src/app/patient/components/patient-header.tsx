import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

import { buttonVariants } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { ROUTES } from "@/lib/constants/routes";

import { usePatientFilters } from "../hooks/use-patient-filters";
import { PatientQueryOptions } from "../queries/patient-queries";
import { PatientFilters } from "./patient-filters";

function PatientHeader() {
  const { filtersAsParams } = usePatientFilters();
  const { data: totalPatients = 0 } = useQuery(PatientQueryOptions.getTotalPatients(filtersAsParams));

  return (
    <header className="flex flex-col lg:flex-row items-center justify-between w-full">
      <PageTitle>
        {totalPatients}
        {" "}
        Paciente
        {totalPatients > 1 ? "s" : ""}
      </PageTitle>

      <div className="flex items-center gap-2">
        <PatientFilters />

        <Link
          to={{
            pathname: ROUTES.actions.create,
          }}
          className={buttonVariants({ className: "w-9 lg:w-max" })}
        >
          <span className="hidden lg:inline">Crear Paciente</span>
          <PlusIcon size={20} />
        </Link>
      </div>
    </header>
  );
}

export { PatientHeader };
