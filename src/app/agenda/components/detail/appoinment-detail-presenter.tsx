import { useParams } from "react-router";

import { AppointmentDetail } from "./appointment-detail";

function AppoinmentDetailPresenter() {
  const { appointmentUid } = useParams();

  if (!appointmentUid) {
    return null;
  }

  return (
    <AppointmentDetail key={appointmentUid} appointmentUid={appointmentUid} />
  );
}

export { AppoinmentDetailPresenter };
