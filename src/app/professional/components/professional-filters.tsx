import { ChevronLeftIcon, ChevronRightIcon, FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import { useProfessionalFiltersController } from "../hooks/use-professional-filters-controller";
import { useQueryProfessionals } from "../hooks/use-query-professionals";
import { ProfessionalQuery } from "../queries/professional-queries";

function ProfessionalFilters() {
  const {
    handleRefresh,
    handlePageChange,
    handleClearAllFilters,
  } = useProfessionalFiltersController();
  const { data } = useQueryProfessionals({ queryOptions: ProfessionalQuery.getMetaData });
  const { page, pages } = {
    page: data?.page || 1,
    pages: data?.pages || 1,
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">
        Pagína:
        {" "}
        {page}
        {" de "}
        {pages}
      </span>

      <DefaultTooltip content="Pagína anterior">
        <Button
          size="icon"
          variant="outline"
          disabled={page <= 1}
          onClick={() => handlePageChange("prev")}
        >
          <ChevronLeftIcon size={20} />
        </Button>
      </DefaultTooltip>

      <DefaultTooltip content="Pagína siguiente">
        <Button
          size="icon"
          variant="outline"
          disabled={page >= pages}
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
        <Button variant="outline" className="w-9 md:w-max" onClick={handleClearAllFilters}>
          <span className="hidden md:inline">Limpiar</span>
          <FunnelXIcon size={20} />
        </Button>
      </DefaultTooltip>
    </div>
  );
}

export { ProfessionalFilters };
