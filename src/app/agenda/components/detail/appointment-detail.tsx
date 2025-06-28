import { CopyIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { ProfessionalAppointmentInfo } from "@/app/professional/components/professional-appointment-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes.constant";
import { getUrlData } from "@/lib/utils";

import { STATUS_NAMES } from "../../helpers/constants";
import { AppointmentStatus } from "../../types/appointment";
import { AppointmentStatusIcon } from "../appoinment-status-icon";
import { DatetimeAttetionAppointment } from "../datetime-attetion-appointment";
import { AppointmentDetailForm } from "./appointment-detail-form";

type Props = {
  appointmentId: string;
};

function AppointmentDetail({ appointmentId }: Props) {
  const navigate = useNavigate();

  const handleCloseDetail = () => {
    const { search } = getUrlData();
    navigate(`${ROUTES.agenda}${search}`, { replace: true });
  };

  return (
    <aside className="pl-4 min-w-lg w-lg space-y-4 ml-4 border-l flex flex-col">
      <div className="flex items-center">
        <h3 className="text-xl w-72 truncate">
          <span className="min-w-max font-semibold mr-1.5">Cita ID:</span>
          {appointmentId}
        </h3>
        <DefaultTooltip content="Copiar ID">
          <Button size="icon" variant="ghost">
            <CopyIcon size={20} />
          </Button>
        </DefaultTooltip>
        <Badge
          variant="available"
          className="pe-2.5 ml-auto"
        >
          <AppointmentStatusIcon status={AppointmentStatus.AVAILABLE} />
          {STATUS_NAMES.AVAILABLE}
        </Badge>
      </div>

      <DatetimeAttetionAppointment status={AppointmentStatus.CANCELLED} />

      <ProfessionalAppointmentInfo />

      <AppointmentDetailForm />

      <div className="mt-auto flex justify-end gap-2">
        <Button onClick={handleCloseDetail}>
          Cerrar
        </Button>
      </div>
    </aside>
  );
}

export { AppointmentDetail };
