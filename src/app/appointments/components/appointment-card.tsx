import type { PropsWithChildren } from "react";

import { cn, formatPhoneNumber } from "@/lib/utils";

import type { AppointmentModel } from "../domain/models/appointment-model";

import { useAppointmentCard } from "../hooks/use-appointment-card";
import { formatAppointmentDateTime } from "../lib/utils";

type Props = PropsWithChildren<{
  appointment: AppointmentModel;
}>;

function AppointmentCard({ appointment }: Props) {
  const { date, time_from, time_to } = appointment;
  const { isAvailable, handleNavigate } = useAppointmentCard({
    appointment_status: appointment.appointment_status,
    uid: appointment.uid,
  });

  return (
    <div
      onClick={handleNavigate}
      data-status={appointment.appointment_status.toLocaleLowerCase().replace("_", "")}
      className={cn(
        "relative py-2 px-4 text-xs flex flex-col rounded-lg overflow-hidden shadow w-full h-full justify-center cursor-pointer transition-colors",
        "before:content-[' '] before:absolute before:top-0 before:left-0 before:w-2 before:h-full",
        "data-[status=toconfirm]:before:bg-amber-400",
        "data-[status=available]:before:bg-neutral-200",
        "data-[status=cancelled]:before:bg-red-400",
        "data-[status=confirmed]:before:bg-green-400",
        "data-[status=toconfirm]:bg-amber-100/60 data-[status=toconfirm]:hover:bg-amber-100",
        "data-[status=available]:bg-neutral-100/60 data-[status=available]:hover:bg-neutral-100",
        "data-[status=cancelled]:bg-red-100/60 data-[status=cancelled]:hover:bg-red-100",
        "data-[status=confirmed]:bg-green-100/60 data-[status=confirmed]:hover:bg-green-100",
        "data-[status=toconfirm]:text-amber-800",
        "data-[status=available]:text-neutral-800",
        "data-[status=cancelled]:text-red-800",
        "data-[status=confirmed]:text-green-800",
      )}
    >
      {
        isAvailable
          ? (
              <>
                <h6 className="font-semibold text-center text-sm">Disponible</h6>
              </>
            )
          : (
              <>
                <h6 className="font-medium text-sm capitalize">{appointment.professional_name}</h6>
                <span>{appointment.professions.join(", ")}</span>
                <h6 className="font-medium text-sm capitalize mt-2">{appointment.patient_name}</h6>
                <span>
                  {appointment.patient_rut}
                  {" "}
                  /
                  {" "}
                  {formatPhoneNumber(appointment.patient_phone)}
                </span>
              </>
            )
      }
      <small className="text-center mt-2">
        {formatAppointmentDateTime({ time_from, time_to, date })}
      </small>
    </div>
  );
}

export { AppointmentCard };
