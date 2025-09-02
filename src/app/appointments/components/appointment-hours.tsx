import { DateFormat, dateHelper } from "@/lib/date-helper";
import { cn } from "@/lib/utils";

import type { AppointmentDetailModel } from "../models/appointment-detail-model";

type Props = {
  datetime: Pick<AppointmentDetailModel, "date" | "time_from" | "time_to">;
};

function AppointmentHours({ datetime }: Props) {
  return (
    <div
      className={cn(
        "w-full rounded-lg overflow-hidden grid grid-cols-2",
        "*:p-1.5 text-center *:odd:border-r border bg-sidebar",
      )}
    >
      <span className="font-semibold border-b">Fecha atención</span>
      <span className="font-semibold border-b">Horario de atención</span>
      <span>
        {dateHelper.format(
          dateHelper.parseISO(datetime.date),
          DateFormat["dd-MM-yyyy"],
        )}
      </span>
      <span>
        {datetime.time_from}-{datetime.time_to}
      </span>
    </div>
  );
}

export { AppointmentHours };
