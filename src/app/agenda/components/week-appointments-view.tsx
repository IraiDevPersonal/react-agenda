import { useQuery } from "@tanstack/react-query";

import { getAppointmentsQueryOptions } from "../queries/appointment-queries";
import { AppointmentCard } from "./appointment-card";
import Grid from "./appointment-grid";

function WeekAppointmentsView() {
  const { data } = useQuery(getAppointmentsQueryOptions());
  return (
    <Grid>
      <Grid.Header>
        <Grid.Col className="text-right">Horario</Grid.Col>
        <Grid.Col>Lunes</Grid.Col>
        <Grid.Col>Martes</Grid.Col>
        <Grid.Col>Miercoles</Grid.Col>
        <Grid.Col>Jueves</Grid.Col>
        <Grid.Col>Viernes</Grid.Col>
        <Grid.Col>Sabado</Grid.Col>
        {/* <Grid.Col>Domingo</Grid.Col> */}
      </Grid.Header>
      {
        data?.map(appointment => (
          <Grid.Row key={appointment.uid}>
            <Grid.TimeCol from={appointment.time_from} to={appointment.time_to} />
            <Grid.Col>
              <AppointmentCard appointment={appointment} />
            </Grid.Col>
            <Grid.Col>
              <AppointmentCard appointment={appointment} />
            </Grid.Col>
            <Grid.Col>
              <AppointmentCard appointment={appointment} />
            </Grid.Col>
            <Grid.Col>
              <AppointmentCard appointment={appointment} />
            </Grid.Col>
            <Grid.Col>
              <AppointmentCard appointment={appointment} />
            </Grid.Col>
            <Grid.Col>
              <AppointmentCard appointment={appointment} />
            </Grid.Col>
            {/* <Grid.Col></Grid.Col> */}
          </Grid.Row>
        ))
      }
    </Grid>
  );
}

export { WeekAppointmentsView };
