import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon, FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import { usePatientFilterController } from "../hooks/use-patient-filter-controller";
import { usePatientFilters } from "../hooks/use-patient-filters";
import { PatientQueryOptions } from "../queries/patient-queries";

function PatientFilters() {
  const {
    handleRefresh,
    handlePageChange,
    handleClearAllFilters,
  } = usePatientFilterController();
  const { filtersAsParams } = usePatientFilters();

  const { data } = useQuery(PatientQueryOptions.getPatientMetaData(filtersAsParams));

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">
        Pagína:
        {" "}
        {data?.page}
        {" de "}
        {data?.pages}
      </span>

      <DefaultTooltip content="Pagína anterior">
        <Button
          size="icon"
          variant="outline"
          disabled={data?.page === 1}
          onClick={() => handlePageChange("prev")}
        >
          <ChevronLeftIcon size={20} />
        </Button>
      </DefaultTooltip>

      <DefaultTooltip content="Pagína siguiente">
        <Button
          size="icon"
          variant="outline"
          disabled={data?.page === data?.pages}
          onClick={() => handlePageChange("next")}
        >
          <ChevronRightIcon size={20} />
        </Button>
      </DefaultTooltip>

      <DefaultTooltip content="Refrescar datos">
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RotateCcwIcon size={20} />
        </Button>
      </DefaultTooltip>

      <DefaultTooltip content="Limpiar todos los filtros">
        <Button variant="outline" onClick={handleClearAllFilters}>
          <span>Limpiar</span>
          <FunnelXIcon size={20} />
        </Button>
      </DefaultTooltip>
    </div>
  );
}

export { PatientFilters };
