import { appointmentAdapter } from "../adapters/appointment.adapter";
import { AppointmentCard } from "./appointment-card";
import Grid from "./appointment-grid";

function DayAppointmentsView() {
  return (
    <>
      <Grid className="max-w-xl">
        <Grid.Header>
          <Grid.Col className="text-right">Horario</Grid.Col>
          <Grid.Col className="text-left">Día</Grid.Col>
        </Grid.Header>
        {
          Array.from({ length: 10 }).map((_, idx) => (
            <Grid.Row key={idx}>
              <Grid.Col className="text-right text-muted-foreground flex flex-col justify-between">
                <span>09:30</span>
                <span>10:30</span>
              </Grid.Col>
              <Grid.Col className="col-span-6">
                <AppointmentCard appointment={appointmentAdapter.item(undefined)} />
              </Grid.Col>
            </Grid.Row>
          ))
        }
      </Grid>
    </>
  );
}

export { DayAppointmentsView };
