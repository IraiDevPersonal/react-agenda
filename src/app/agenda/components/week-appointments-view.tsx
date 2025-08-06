import { For } from "@/components/for";
import { Show } from "@/components/show";

import { WEEK_DAYS } from "../constants";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { useQueryAppointments } from "../hooks/use-query-appointments";
import { AppointmentQuery } from "../queries/appointment-queries";
import { showAppointmentInDay } from "../utils";
import { AppointmentCard } from "./appointment-card";
import { AppointmentGrid as Grid } from "./appointment-grid";
import { AppointmentListFallback } from "./appointment-list-fallback";
import { WeekGridHeader } from "./week-grid-header";

function WeekAppointmentsView() {
  const { data } = useQueryAppointments({
    queryOptions: ({
      date,
      date_from,
      ...filters
    }) =>
      AppointmentQuery.getAll({ ...filters, date: date_from }),
  });
  const { filters } = useAppointmentFilters();

  return (
    <Grid className="min-w-[1632px] w-full">
      <WeekGridHeader />

      <For
        fallback={cls => <AppointmentListFallback className={cls} />}
        items={filters.profession_id ? data : []}
      >
        {appointment => (
          <Grid.Row key={appointment.uid} className="grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr]">
            <Grid.TimeCol from={appointment.time_from} to={appointment.time_to} />

            <For items={WEEK_DAYS.map(el => el.value)}>
              {weekday => (
                <Grid.Col key={weekday}>
                  <Show when={showAppointmentInDay(appointment.date, weekday)}>
                    <AppointmentCard appointment={appointment} />
                  </Show>
                </Grid.Col>
              )}
            </For>
          </Grid.Row>
        )}
      </For>
    </Grid>
  );
}

export { WeekAppointmentsView };
