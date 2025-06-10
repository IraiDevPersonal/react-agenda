import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import type { Appointment } from "../types/appointment";

import { StatusColors } from "../lib/constants";
import { generateAppoinmentDatetimeText } from "../lib/utils";
import { AppointmentStatus } from "../types/appointment";

type Props = PropsWithChildren<{
  appointment: Appointment;
}>;

function AppointmentCard({ appointment }: Props) {
  const isAvailable = appointment.appointment_status === AppointmentStatus.AVAILABLE;

  return (
    <div className={cn(
      "relative bg-card p-2 ps-4 flex flex-col rounded-lg overflow-hidden border hover:border-primary/30 transition-colors w-full h-full justify-center",
      "before:content-[' '] before:absolute before:top-0 before:left-0 before:w-2 before:h-full",
      StatusColors[appointment.appointment_status].card,
    )}
    >
      {
        isAvailable
          ? (
              <small className="text-center font-semibold">{generateAppoinmentDatetimeText(appointment)}</small>
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
