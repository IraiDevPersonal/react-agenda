import { useQuery } from "@tanstack/react-query";

import { For } from "@/components/for";
import { Show } from "@/components/show";
import { Table } from "@/components/ui/table";
import { dateHelper } from "@/lib/date-helper";

import { appointmentQuery } from "../container";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { useFilterAppointmentByStatus } from "../hooks/use-filter-appointment-by-status";
import { WEEK_DAYS } from "../utils/constants";
import { formatDateRange, getAllDaysInDateRange, isAppointmentOnDay } from "../utils/utils";
import { AppointmentCard } from "./appointment-card";
import { AppointmentListFallback } from "./appointment-list-fallback";
import { AppointmentTimeRangeCell } from "./appointment-time-range-cell";

const { format, getDay } = dateHelper;

function WeekAppointmentsView() {
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
  const { filters: {
    date_to,
    date_from,
  } } = useAppointmentFilters();

  return (
    <Table.Header>
      <Table.HeaderRow>
        <Table.Head className="w-18 text-right px-2 capitalize">
          {formatDateRange({ from: date_from, to: date_to })}
        </Table.Head>

        <For items={WEEK_DAYS}>
          {({ label, value }) => {
            const match = getAllDaysInDateRange(date_from, date_to).find(d => getDay(d) === value);
            const day = match ? format(match, "dd") : "--";

            return (
              <Table.Head key={label} className="border-l w-[278px]">
                {`${label} ${day}`}
              </Table.Head>
            );
          }}
        </For>
      </Table.HeaderRow>
    </Table.Header>
  );
}

function AppointmentRows() {
  const { filters: {
    date,
    date_to,
    date_from,
    ...filters
  } } = useAppointmentFilters();
  const { data } = useQuery(appointmentQuery.list({ ...filters, date_to, date: date_from }));
  const appointments = useFilterAppointmentByStatus({ appointments: data });

  return (
    <For
      fallback={cls => <AppointmentListFallback colSpan={WEEK_DAYS.length + 1} className={cls} />}
      items={filters.profession_id ? appointments : []}
    >
      {appointment => (
        <Table.Row key={appointment.uid}>
          <AppointmentTimeRangeCell timeFrom={appointment.time_from} timeTo={appointment.time_to} />

          <For items={WEEK_DAYS}>
            {({ value }) => (
              <Table.Cell key={value}>
                <Show when={isAppointmentOnDay(appointment.date, value)}>
                  <AppointmentCard appointment={appointment} />
                </Show>
              </Table.Cell>
            )}
          </For>
        </Table.Row>
      )}
    </For>
  );
}

export { WeekAppointmentsView };
