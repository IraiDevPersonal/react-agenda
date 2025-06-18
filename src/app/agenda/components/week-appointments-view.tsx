import { useQuery } from "@tanstack/react-query";

import { For } from "@/components/for";
import { Show } from "@/components/show";
import { dateHelper } from "@/lib/date-helper";
import { cn } from "@/lib/utils";

import { showAppointmentInDay } from "../helpers/utils";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { getAppointmentsQueryOptions } from "../queries/appointment.query";
import { AppointmentCard } from "./appointment-card";
import Grid from "./appointment-grid";

const { isSameMonth, format, getDay, eachDayOfInterval } = dateHelper;

function daysInRange(dateFrom: Date | null, dateTo: Date | null) {
  return eachDayOfInterval({
    start: dateFrom!,
    end: dateTo!,
  });
}

const weekDays = [
  { label: "Lunes", value: 1 },
  { label: "Martes", value: 2 },
  { label: "Miércoles", value: 3 },
  { label: "Jueves", value: 4 },
  { label: "Viernes", value: 5 },
  { label: "Sábado", value: 6 },
];

function WeekAppointmentsView() {
  const { filters, filtersAsParams: { date, date_from, ...params } } = useAppointmentFilters();
  const { data } = useQuery(getAppointmentsQueryOptions({ ...params, date: date_from }));

  return (
    <Grid>
      <Grid.Header className="grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr]">
        <Grid.Col className="capitalize">
          {isSameMonth(filters.date_from!, filters.date_to!)
            ? (format(filters.date_from!, "MMMM"))
            : (`${format(filters.date_from!, "MMM")} - ${format(filters.date_to!, "MMM")}`)}
        </Grid.Col>

        <For items={weekDays}>
          {({ label, value }) => {
            const { date_from, date_to } = filters;
            const match = daysInRange(date_from, date_to).find(d => getDay(d) === value);
            const day = match ? format(match, "dd") : "--";

            return (
              <Grid.Col key={label}>
                {`${label} ${day}`}
              </Grid.Col>
            );
          }}
        </For>
      </Grid.Header>
      <For
        fallback={cls => (
          <Grid.Col className={cn(cls, "h-96 grid place-content-center")}>
            {
              filters.profession_id ? "Sin Agenda para fecha seleccionada..." : "Seleccione profesión"
            }
          </Grid.Col>
        )}
        items={filters.profession_id ? data : []}
      >
        {appointment => (
          <Grid.Row key={appointment.uid} className="grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr]">
            <Grid.TimeCol from={appointment.time_from} to={appointment.time_to} />

            <For items={weekDays.map(el => el.value)}>
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
