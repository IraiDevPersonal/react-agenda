import { useNavigate, useParams } from "react-router";

import { ROUTES } from "@/lib/constants/routes";
import { getUrlData } from "@/lib/utils";

export function useAppointmentDetailControl() {
  const { appointmentUid = "" } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    const { search } = getUrlData();
    navigate(`${ROUTES.agenda}${search}`, { replace: true });
  };

  return {
    appointmentUid,
    handleClose,
  };
}
