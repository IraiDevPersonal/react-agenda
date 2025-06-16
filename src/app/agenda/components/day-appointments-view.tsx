import { useQuery } from "@tanstack/react-query";

import { For } from "@/components/for";
import { Show } from "@/components/show";
import { dateFormat, dateHelper } from "@/lib/date-helper";

import { showAppointmentInDay } from "../helpers/utils";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { getAppointmentsQueryOptions } from "../queries/appointment.query";
import { AppointmentCard } from "./appointment-card";
import Grid from "./appointment-grid";

function DayAppointmentsView() {
  const { filtersAsParams: { date_to, date_from, ...params }, filters } = useAppointmentFilters();
  const { data } = useQuery(getAppointmentsQueryOptions(params));

  return (
    <>
      <Grid className="max-w-xl">
        <Grid.Header>
          <Grid.Col></Grid.Col>
          <Grid.Col className="text-left col-span-6 first-letter:uppercase">
            {dateHelper.format(
              dateHelper.createDate(filters.date),
              dateFormat["EEEE dd 'de' MMMM 'de' yyyy"],
            )}
          </Grid.Col>
        </Grid.Header>
        <For
          fallback={cls => <Grid.Col className={cls}>No hay citas...</Grid.Col>}
          items={data}
        >
          {appointment => (
            <Grid.Row key={appointment.uid}>
              <Grid.TimeCol from={appointment.time_from} to={appointment.time_to} />
              <Grid.Col className="col-span-6">
                <Show
                  when={
                    showAppointmentInDay(
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
