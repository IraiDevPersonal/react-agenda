import type { PropsWithChildren } from "react";

import { useNavigate } from "react-router";

import { ROUTES } from "@/constants/routes.constant";
import { cn, getUrl } from "@/lib/utils";

import type { Appointment } from "../types/appointment";

import { generateAppoinmentDatetimeText } from "../helpers/utils";
import { AppointmentStatus } from "../types/appointment";
import { AppointmentStatusIcon } from "./appoinment-status-icon";

type Props = PropsWithChildren<{
  appointment: Appointment;
}>;

function AppointmentCard({ appointment }: Props) {
  const isAvailable = appointment.appointment_status === AppointmentStatus.AVAILABLE;

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (getUrl().pathname.includes(appointment.uid))
      return;
    navigate(`${ROUTES.agenda}/${appointment.uid}/${getUrl().search}`);
  };

  return (
    <div
      onClick={handleNavigate}
      data-status={appointment.appointment_status.toLocaleLowerCase()}
      className={cn(
        "relative bg-card p-2 ps-4 flex flex-col rounded-lg overflow-hidden border hover:border-primary/30 transition-colors w-full h-full justify-center cursor-pointer",
        "before:content-[' '] before:absolute before:top-0 before:left-0 before:w-2 before:h-full",
        "data-[status=to_confirm]:before:bg-amber-400",
        "data-[status=available]:before:bg-neutral-200",
        "data-[status=cancelled]:before:bg-red-400",
        "data-[status=confirmed]:before:bg-green-400",
      )}
    >
      <span className="absolute top-2 right-2">
        <AppointmentStatusIcon status={appointment.appointment_status} />
      </span>
      {
        isAvailable
          ? (
              <>
                <span className="font-semibold text-center">Disponible</span>
                <small className="text-center text-muted-foreground">
                  {generateAppoinmentDatetimeText(appointment)}
                </small>
              </>
            )
          : (
              <>
                <span className="font-semibold text-base capitalize">{appointment.patient_name}</span>
                <span className="text-muted-foreground">{appointment.patient_rut}</span>
                <span className="text-muted-foreground">{appointment.patient_phone}</span>
                <small className="text-muted-foreground">
                  {generateAppoinmentDatetimeText(appointment)}
                </small>
              </>
            )
      }
    </div>
  );
}

export { AppointmentCard };
