import { Sheet } from "@/components/ui/sheet";

import { useAppointmentDetailControl } from "../../hooks/use-appointment-detail-control";
import { AppointmentDetail } from "./appointment-detail";

function SheetAppointmentDetail() {
  const { appointmentUid, handleClose } = useAppointmentDetailControl();

  return (
    <Sheet
      hideCloseButton
      open={!!appointmentUid}
      onOpenChange={handleClose}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title className="text-3xl leading-none mb-4">Agendar cita</Sheet.Title>
        </Sheet.Header>

        <AppointmentDetail key={appointmentUid} uid={appointmentUid} />
      </Sheet.Content>
    </Sheet>
  );
}

export { SheetAppointmentDetail };
