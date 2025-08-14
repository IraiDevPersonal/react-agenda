import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import type { AppointmentStatus } from "../../domain/models/type";

import { STATUS_NAMES } from "../../lib/constants";
import { AppointmentStatusIcon } from "../appoinment-status-icon";

type Props = {
  status: AppointmentStatus;
  uid: string;
};

function AppointmentDetailInfo({ status, uid }: Props) {
  return (
    <div className="flex items-center w-full">
      <div className="text-lg leading-none w-72 truncate">
        <span className="min-w-max font-semibold mr-1.5">Cita ID:</span>
        {uid}
      </div>

      <DefaultTooltip content="Copiar ID de cita">
        <CopyButton value={uid} />
      </DefaultTooltip>

      <Badge
        variant={status.toLocaleLowerCase() as any}
        className="px-0.5 pe-2 ml-auto"
      >
        <AppointmentStatusIcon status={status} />
        {STATUS_NAMES[status]}
      </Badge>
    </div>
  );
}

export { AppointmentDetailInfo };
