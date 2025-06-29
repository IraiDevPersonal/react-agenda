import { DefaultTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { StatusColors, StatusNames } from "../lib/constants";
import { AppointmentStatus } from "../types/appointment";

function AppointmentHeader() {
  return (
    <>
      <header>
        <div>
          <h1 className="text-4xl font-bold mb-4">Mi Agenda</h1>
          <div className="flex gap-2 items-center">
            <h5 className="text-muted-foreground">Estados: </h5>
            <ColorBall status={AppointmentStatus.INDETERMINATE} />
            <ColorBall status={AppointmentStatus.AVAILABLE} />
            <ColorBall status={AppointmentStatus.CONFIRMED} />
            <ColorBall status={AppointmentStatus["TO-CONFIRM"]} />
            <ColorBall status={AppointmentStatus.CANCELLED} />
          </div>
        </div>
      </header>
    </>
  );
}

function ColorBall({ status }: { status: AppointmentStatus }) {
  return (
    <DefaultTooltip content={StatusNames[status]}>
      <span className={cn("rounded-full h-4 w-4 block transition-colors cursor-help", StatusColors[status].bg)} />
    </DefaultTooltip>
  );
}

export { AppointmentHeader };
