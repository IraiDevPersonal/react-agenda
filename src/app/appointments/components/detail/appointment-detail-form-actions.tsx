import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";

import { APPOINTMENT_DETAIL_FORM_ID } from "../../lib/constants";

function AppointmentDetailFormActions() {
  return (
    <Sheet.Footer>
      <Sheet.Close asChild>
        <Button variant="secondary">
          Cerrar
        </Button>
      </Sheet.Close>

      <Button form={APPOINTMENT_DETAIL_FORM_ID} type="submit">
        Agendar
      </Button>
    </Sheet.Footer>
  );
}

export { AppointmentDetailFormActions };
