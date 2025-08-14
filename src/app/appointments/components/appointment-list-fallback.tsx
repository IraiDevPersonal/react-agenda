import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { useAppointmentFilters } from "../hooks/use-appointment-filters";

type Props = {
  className?: string;
  colSpan?: number;
};

function AppointmentListFallback({ className, colSpan }: Props) {
  const { filters } = useAppointmentFilters();

  return (
    <Table.Row>
      <Table.Cell colSpan={colSpan} className={cn("h-96 align-middle text-center", className)}>
        {
          filters.profession_id ? "Sin Agenda para fecha seleccionada..." : "Seleccione profesión..."
        }
      </Table.Cell>
    </Table.Row>
  );
}

export { AppointmentListFallback };
