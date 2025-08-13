import { useQuery } from "@tanstack/react-query";

import { For } from "@/components/for";
import { Show } from "@/components/show";

import { appointmentQuery } from "../container";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { WEEK_DAYS } from "../lib/constants";
import { isAppointmentOnDay } from "../lib/utils";
import { AppointmentCard } from "./appointment-card";
import { AppointmentGrid as Grid } from "./appointment-grid";
import { AppointmentListFallback } from "./appointment-list-fallback";
import { WeekGridHeader } from "./week-grid-header";

function WeekAppointmentsView() {
  const { filters: {
    date,
    date_from,
    ...filters
  } } = useAppointmentFilters();
  const { data } = useQuery(appointmentQuery.list({ ...filters, date: date_from }));

  return (
    <Grid className="min-w-[1632px] w-full">
      <WeekGridHeader />

      <For
        fallback={cls => <AppointmentListFallback className={cls} />}
        items={filters.profession_id ? data : []}
      >
        {appointment => (
          <Grid.Row key={appointment.uid} className="grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr]">
            <Grid.TimeCell from={appointment.time_from} to={appointment.time_to} />

            <For items={WEEK_DAYS.map(el => el.value)}>
              {weekday => (
                <Grid.Cell key={weekday}>
                  <Show when={isAppointmentOnDay(appointment.date, weekday)}>
                    <AppointmentCard appointment={appointment} />
                  </Show>
                </Grid.Cell>
              )}
            </For>
          </Grid.Row>
        )}
      </For>
    </Grid>
  );
}

export { WeekAppointmentsView };
