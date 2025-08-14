import { useParams } from "react-router";

import { AppointmentDetail } from "./appointment-detail";

function AppoinmentDetailView() {
  const { appointmentUid = "" } = useParams();

  return (
    <AppointmentDetail key={appointmentUid} appointmentUid={appointmentUid} />
  );
}

export { AppoinmentDetailView };
