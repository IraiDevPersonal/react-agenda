import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constant";
import { getUrlData } from "@/lib/utils";

import { APPOINTMENT_DETAIL_FORM_ID } from "../../constants";

function AppointmentDetailFormActions() {
  const navigate = useNavigate();

  const handleCloseDetail = () => {
    const { search } = getUrlData();
    navigate(`${ROUTES.agenda}${search}`, { replace: true });
  };
  return (
    <div className="flex justify-end gap-2">
      <Button variant="secondary" onClick={handleCloseDetail}>
        Cerrar
      </Button>

      <Button form={APPOINTMENT_DETAIL_FORM_ID} type="submit">
        Agendar Paciente
      </Button>
    </div>
  );
}

export { AppointmentDetailFormActions };
