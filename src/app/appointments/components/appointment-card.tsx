import { HeartHandshakeIcon, PhoneIcon, UserIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import { cn, formatPhoneNumber } from "@/lib/utils";
import { useAppointmentCard } from "../hooks/use-appointment-card";
import type { AppointmentModel } from "../models/appointment-model";
import { formatAppointmentDateTime } from "../utils/utils";

type Props = PropsWithChildren<{
  appointment: AppointmentModel;
}>;

function AppointmentCard({ appointment }: Props) {
  const { date, time_from, time_to, patient, professional: user } = appointment;
  const { isAvailable, handleNavigate } = useAppointmentCard({
    status: appointment.status,
    uid: appointment.uid,
  });

  return (
    <div
      onClick={() => handleNavigate()}
      data-status={appointment.status.toLocaleLowerCase().replace("_", "")}
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
      {isAvailable ? (
        <h6 className="font-semibold text-center text-sm">Disponible</h6>
      ) : (
        <>
          <h6 className="font-medium text-sm capitalize">{user.name}</h6>
          <div>
            <HeartHandshakeIcon size={14} className="inline-block mr-1" />
            <span className="italic">{user.professions.join(", ")}</span>
          </div>
          {patient && (
            <>
              <h6 className="font-medium text-sm capitalize mt-2">
                {patient.name}
              </h6>
              <div>
                <UserIcon size={14} className="inline-block mr-1" />
                <span>{patient.rut}</span>
              </div>
              <div>
                <PhoneIcon size={12} className="inline-block ms-0.5 mr-1" />
                <span>{formatPhoneNumber(patient.phone)}</span>
              </div>
            </>
          )}
        </>
      )}
      <small className="text-center mt-2">
        {formatAppointmentDateTime({ time_from, time_to, date })}
      </small>
    </div>
  );
}

export { AppointmentCard };
