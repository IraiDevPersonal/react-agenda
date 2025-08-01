import { cn } from "@/lib/utils";

import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { AppointmentGrid as Grid } from "./appointment-grid";

type Props = {
  className?: string;
};

function AppointmentListFallback({ className }: Props) {
  const { filters } = useAppointmentFilters();
  return (
    <Grid.Col className={cn(className, "h-96 grid place-content-center")}>
      {
        filters.profession_id ? "Sin Agenda para fecha seleccionada..." : "Seleccione profesión..."
      }
    </Grid.Col>
  );
}

export { AppointmentListFallback };
