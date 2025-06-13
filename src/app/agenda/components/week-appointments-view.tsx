import { useQuery } from "@tanstack/react-query";

import { For } from "@/components/for";
import { Show } from "@/components/show";

import { showAppointmentInDay } from "../helpers/utils";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { getAppointmentsQueryOptions } from "../queries/appointment.query";
import { AppointmentCard } from "./appointment-card";
import Grid from "./appointment-grid";

function WeekAppointmentsView() {
  const { filtersAsParams: { date, date_from, ...params } } = useAppointmentFilters();
  const { data } = useQuery(getAppointmentsQueryOptions({ ...params, date: date_from }));

  return (
    <Grid>
      <Grid.Header>
        <Grid.Col></Grid.Col>
        <Grid.Col>Lunes</Grid.Col>
        <Grid.Col>Martes</Grid.Col>
        <Grid.Col>Miercoles</Grid.Col>
        <Grid.Col>Jueves</Grid.Col>
        <Grid.Col>Viernes</Grid.Col>
        <Grid.Col>Sabado</Grid.Col>
      </Grid.Header>
      <For
        fallback={cls => <Grid.Col className={cls}>No hay citas...</Grid.Col>}
        items={data}
      >
        {appointment => (
          <Grid.Row key={appointment.uid}>
            <Grid.TimeCol from={appointment.time_from} to={appointment.time_to} />
            <For items={[1, 2, 3, 4, 5, 6]}>
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
