import { cn } from "@/lib/utils";

import type { AppointmentStatus } from "../types/appointment";

type Props = {
  status: AppointmentStatus;
};

function DatetimeAttetionAppointment({ status }: Props) {
  return (
    <div
      data-status={status.toLocaleLowerCase().replace("_", "")}
      className={cn(
        "w-full rounded-lg overflow-hidden grid grid-cols-2",
        "*:p-1.5 text-center *:odd:border-r border bg-sidebar",
      )}
    >
      <span className="font-semibold border-b">
        Fecha atención
      </span>
      <span className="font-semibold border-b">
        Horario de atención
      </span>
      <span>
        16-06-2025
      </span>
      <span>
        10:00 - 10:45
      </span>
    </div>
  );
}

export { DatetimeAttetionAppointment };
