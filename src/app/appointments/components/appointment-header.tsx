import { PageTitle } from "@/components/ui/page-title";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { STATUS_NAMES } from "../utils/constants";
import { AppointmentStatus } from "../models/shared-model";
import { AppointmentStatusIcon } from "./appoinment-status-icon";
import { AppointmentFilters } from "./appointment-filters";

function AppointmentHeader() {
  return (
    <>
      <header className="flex items-end justify-between w-full">
        <div>
          <PageTitle>Mi Agenda</PageTitle>
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground">Estados: </span>
            <ColorBall status={AppointmentStatus.INDETERMINATE} />
            <ColorBall status={AppointmentStatus.AVAILABLE} />
            <ColorBall status={AppointmentStatus.CONFIRMED} />
            <ColorBall status={AppointmentStatus.TO_CONFIRM} />
            <ColorBall status={AppointmentStatus.CANCELLED} />
          </div>
        </div>
        <AppointmentFilters />
      </header>
    </>
  );
}

function ColorBall({ status }: { status: AppointmentStatus }) {
  return (
    <DefaultTooltip content={STATUS_NAMES[status]}>
      <span
        data-status={status.toLocaleLowerCase().replace("_", "")}
        className={cn(
          "rounded-full h-6 w-6 cursor-help grid place-content-center",
          "data-[status=available]:bg-neutral-100/70",
          "data-[status=cancelled]:bg-red-100/70",
          "data-[status=confirmed]:bg-green-100/70",
          "data-[status=toconfirm]:bg-amber-100/70",
          "data-[status=indeterminate]:border data-[status=indeterminate]:border-border data-[status=indeterminate]:hover:border-primary/30",
        )}
      >
        <AppointmentStatusIcon status={status} />
      </span>
    </DefaultTooltip>
  );
}

export { AppointmentHeader };
