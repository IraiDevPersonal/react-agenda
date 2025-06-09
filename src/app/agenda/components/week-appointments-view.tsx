import { appointmentAdapter } from "../adapters/appointment.adapter";
import { AppointmentCard } from "./appointment-card";
import Grid from "./appointment-grid";

function WeekAppointmentsView() {
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
        Array.from({ length: 10 }).map((_, idx) => (
          <Grid.Row key={idx}>
            <Grid.Col className="text-right text-muted-foreground flex flex-col justify-between">
              <span>09:30</span>
              <span>10:30</span>
            </Grid.Col>
            <Grid.Col>
              <AppointmentCard appointment={appointmentAdapter.item(undefined)} />
            </Grid.Col>
            <Grid.Col>
              <AppointmentCard appointment={appointmentAdapter.item(undefined)} />
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col></Grid.Col>
            {/* <Grid.Col></Grid.Col> */}
          </Grid.Row>
        ))
      }
    </Grid>
  );
}

export { WeekAppointmentsView };
