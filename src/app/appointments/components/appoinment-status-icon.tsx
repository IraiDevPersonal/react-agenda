import { CircleAlertIcon, CircleCheck, CirclePlus, CircleX } from "lucide-react";

import { AppointmentStatus } from "../models/type";

function AppointmentStatusIcon({ status }: { status: AppointmentStatus }) {
  switch (status) {
    case AppointmentStatus.AVAILABLE:
      return <CirclePlus size={22} className="text-neutral-500" />;
    case AppointmentStatus.CANCELLED:
      return <CircleX size={22} className="text-red-500" />;
    case AppointmentStatus.CONFIRMED:
      return <CircleCheck size={22} className="text-green-500" />;
    case AppointmentStatus.TO_CONFIRM:
      return <CircleAlertIcon size={22} className="text-amber-500" />;
    default:
      return null;
  }
}

export { AppointmentStatusIcon };
