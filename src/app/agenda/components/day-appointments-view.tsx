import { useQuery } from "@tanstack/react-query";

import { date, DateFormats } from "@/lib/date";

import { getAppointmentsQueryOptions } from "../queries/appointment-queries";
import { AppointmentCard } from "./appointment-card";
import Grid from "./appointment-grid";

function DayAppointmentsView() {
  const { data } = useQuery(getAppointmentsQueryOptions());
  return (
    <>
      <Grid className="max-w-xl">
        <Grid.Header>
          <Grid.Col className="text-right">
            Horario
          </Grid.Col>
          <Grid.Col className="text-left col-span-6 first-letter:uppercase">
            {date.format(new Date(), DateFormats["EEEE dd 'de' MMMM 'de' yyyy"])}
          </Grid.Col>
        </Grid.Header>
        {
          data?.map(appointment => (
            <Grid.Row key={appointment.uid}>
              <Grid.TimeCol from={appointment.time_from} to={appointment.time_to} />
              <Grid.Col className="col-span-6">
                <AppointmentCard appointment={appointment} />
              </Grid.Col>
            </Grid.Row>
          ))
        }
      </Grid>
    </>
  );
}

export { DayAppointmentsView };
