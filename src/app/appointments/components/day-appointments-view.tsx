import { useQuery } from "@tanstack/react-query";

import { For } from "@/components/for";
import { Show } from "@/components/show";
import { DateFormat, dateHelper } from "@/lib/date-helper";

import { appointmentQuery } from "../container";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { isAppointmentOnDay } from "../lib/utils";
import { AppointmentCard } from "./appointment-card";
import { AppointmentGrid as Grid } from "./appointment-grid";
import { AppointmentListFallback } from "./appointment-list-fallback";

function DayAppointmentsView() {
  const { filters: {
    date_from,
    date_to,
    ...filters
  } } = useAppointmentFilters();
  const { data } = useQuery(appointmentQuery.list({ ...filters }));

  return (
    <>
      <Grid className="max-w-xl">
        <Grid.Header>
          <Grid.Col></Grid.Col>
          <Grid.Col className="text-left col-span-6 first-letter:uppercase">
            {dateHelper.format(
              dateHelper.createDate(filters.date),
              DateFormat["EEEE dd 'de' MMMM 'de' yyyy"],
            )}
          </Grid.Col>
        </Grid.Header>
        <For
          fallback={cls => <AppointmentListFallback className={cls} />}
          items={filters.profession_id ? data : []}
        >
          {appointment => (
            <Grid.Row key={appointment.uid}>
              <Grid.TimeCol from={appointment.time_from} to={appointment.time_to} />
              <Grid.Col className="col-span-6">
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
              </Grid.Col>
            </Grid.Row>
          )}
        </For>
      </Grid>
    </>
  );
}

export { DayAppointmentsView };
