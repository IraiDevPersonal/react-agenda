import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

import { buttonVariants } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { ROUTES } from "@/lib/constants/routes";

import { useProfessionalFilters } from "../hooks/use-professional-filters";
import { professionalQuery } from "../container";
import { ProfessionalFilters } from "./professional-filters";

function ProfessionalHeader() {
  const { filters } = useProfessionalFilters();
  const {
    data: total = 0,
  } = useQuery(professionalQuery.total(filters));

  return (
    <header className="flex flex-col lg:flex-row items-center justify-between w-full">
      <PageTitle>
        {total}
        {" "}
        Profesional
        {total > 1 ? "es" : ""}
      </PageTitle>

      <div className="flex items-center gap-2">
        <ProfessionalFilters />

        <Link
          to={{
            pathname: ROUTES.actions.create,
          }}
          className={buttonVariants({ className: "w-9 lg:w-max" })}
        >
          <span className="hidden lg:inline">Crear Profesional</span>
          <PlusIcon size={20} />
        </Link>
      </div>
    </header>
  );
}

export { ProfessionalHeader };
