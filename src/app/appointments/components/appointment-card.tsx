import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import type { AppointmentModel } from "../domain/models/appointment-model";

import { useAppointmentCard } from "../hooks/use-appointment-card";
import { formatAppointmentDateTime } from "../lib/utils";
import { AppointmentStatusIcon } from "./appoinment-status-icon";

type Props = PropsWithChildren<{
  appointment: AppointmentModel;
}>;

function AppointmentCard({ appointment }: Props) {
  const { isAvailable, handleNavigate } = useAppointmentCard({
    appointment_status: appointment.appointment_status,
    uid: appointment.uid,
  });

  return (
    <div
      onClick={handleNavigate}
      data-status={appointment.appointment_status.toLocaleLowerCase().replace("_", "")}
      className={cn(
        "relative bg-card p-2 ps-4 flex flex-col rounded-lg overflow-hidden border hover:border-primary/30 transition-colors w-full h-full justify-center cursor-pointer",
        "before:content-[' '] before:absolute before:top-0 before:left-0 before:w-2 before:h-full",
        "data-[status=toconfirm]:before:bg-amber-400",
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
                <h6 className="font-semibold text-center">Disponible</h6>
                <small className="text-center text-muted-foreground">
                  {formatAppointmentDateTime({
                    time_from: appointment.time_from,
                    time_to: appointment.time_to,
                    date: appointment.date,
                  })}
                </small>
              </>
            )
          : (
              <>
                <h6 className="font-semibold text-base capitalize pe-7">{appointment.patient_name}</h6>
                <span className="text-muted-foreground">{appointment.patient_rut}</span>
                <span className="text-muted-foreground">{appointment.patient_phone}</span>
                <small className="text-muted-foreground">
                  {formatAppointmentDateTime({
                    time_from: appointment.time_from,
                    time_to: appointment.time_to,
                    date: appointment.date,
                  })}
                </small>
              </>
            )
      }
    </div>
  );
}

export { AppointmentCard };
