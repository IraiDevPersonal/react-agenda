import { useQuery } from "@tanstack/react-query";

import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";

import { appointmentQuery } from "../../container";
import { APPOINTMENT_DETAIL_FORM_ID } from "../../lib/constants";
import { AppointmentStatus } from "../../models/shared-model";

type Props = {
  uid: string;
};

function AppointmentDetailFormActions({ uid }: Props) {
  const {
    data: appointmentStatus,
    isLoading,
  } = useQuery(appointmentQuery.detailStatus(uid));

  return (
    <Sheet.Footer>
      <Sheet.Close asChild>
        <Button variant="secondary" disabled={isLoading}>
          Cerrar
        </Button>
      </Sheet.Close>

      <Show when={appointmentStatus === AppointmentStatus.TO_CONFIRM}>
        <Button disabled={isLoading} variant="destructive">
          Cancelar cita
        </Button>
      </Show>

      <Show when={appointmentStatus !== AppointmentStatus.CONFIRMED}>
        <Button
          form={APPOINTMENT_DETAIL_FORM_ID}
          disabled={isLoading}
          type="submit"
        >
          {
            appointmentStatus === AppointmentStatus.AVAILABLE
              ? "Agendar"
              : "Confirmar"
          }
        </Button>
      </Show>
    </Sheet.Footer>
  );
}

export { AppointmentDetailFormActions };
