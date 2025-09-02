import { useQuery } from "@tanstack/react-query";

import { For } from "@/components/for";
import { Show } from "@/components/show";
import { Table } from "@/components/ui/table";
import { DateFormat, dateHelper } from "@/lib/date-helper";

import { appointmentQuery } from "../container";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { useFilterAppointmentByStatus } from "../hooks/use-filter-appointment-by-status";
import { isAppointmentOnDay } from "../utils/utils";
import { AppointmentCard } from "./appointment-card";
import { AppointmentListFallback } from "./appointment-list-fallback";
import { AppointmentTimeRangeCell } from "./appointment-time-range-cell";

function DayAppointmentsView() {
  return (
    <Table.Container>
      <Table>
        <HeaderRow />
        <Table.Body>
          <AppointmentRows />
        </Table.Body>
      </Table>
    </Table.Container>
  );
}

function HeaderRow() {
  const { filters: { date } } = useAppointmentFilters();

  return (
    <Table.Header>
      <Table.HeaderRow>
        <Table.Head className="w-12 p-2"></Table.Head>
        <Table.Head className="w-72 first-letter:uppercase border-l">
          {dateHelper.format(
            dateHelper.createDate(date),
            DateFormat["EEEE dd 'de' MMMM 'de' yyyy"],
          )}
        </Table.Head>
      </Table.HeaderRow>
    </Table.Header>
  );
}

function AppointmentRows() {
  const { filters: {
    date_from,
    date_to,
    ...filters
  } } = useAppointmentFilters();
  const { data } = useQuery(appointmentQuery.list({ ...filters }));
  const appointments = useFilterAppointmentByStatus({ appointments: data });

  return (
    <For
      fallback={cls => <AppointmentListFallback colSpan={2} className={cls} />}
      items={filters.profession_id ? appointments : []}
    >
      {appointment => (
        <Table.Row key={appointment.uid}>
          <AppointmentTimeRangeCell timeFrom={appointment.time_from} timeTo={appointment.time_to} />
          <Table.Cell>
            <Show
              when={
                isAppointmentOnDay(
                  appointment.date,
                  dateHelper.getISODay(dateHelper.createDate(filters.date)),
                )
              }
            >
              <AppointmentCard appointment={appointment} />
            </Show>
          </Table.Cell>
        </Table.Row>
      )}
    </For>
  );
}

export { DayAppointmentsView };
