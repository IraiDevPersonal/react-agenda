import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { useBreakpoints } from "@/lib/hooks/use-breakpoints";

import { InlinePatientFilters } from "./inline-patient-filters";
import { ModalPatientFilters } from "./modal-patient-filters";

function PatientFilters() {
  const matches = useBreakpoints();
  return (
    <div className="flex items-end gap-2">
      {
        matches.max2xl ? <ModalPatientFilters /> : <InlinePatientFilters />
      }
      <DefaultTooltip content="Pagína anterior">
        <Button variant="outline" size="icon">
          <ChevronLeftIcon size={20} />
        </Button>
      </DefaultTooltip>

      <DefaultTooltip content="Pagína siguiente">
        <Button variant="outline" size="icon">
          <ChevronRightIcon size={20} />
        </Button>
      </DefaultTooltip>
    </div>
  );
}

export { PatientFilters };
