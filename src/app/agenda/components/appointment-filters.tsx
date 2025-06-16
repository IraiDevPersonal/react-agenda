import { useBreakpoints } from "@/lib/hooks/use-breakpoints";

import { InlineAppointmentFilters } from "./inline-appointment-filters";
import { ModalAppointmentFilters } from "./modal-appointment-filters";

function AppointmentFilters() {
  const matches = useBreakpoints();
  return (
    <div className="flex items-end gap-2">
      {
        matches.max3xl ? <ModalAppointmentFilters /> : <InlineAppointmentFilters />
      }
    </div>
  );
}

export { AppointmentFilters };
