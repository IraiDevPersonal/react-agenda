import { DateFormat, dateHelper } from "@/lib/date-helper";
import { cn } from "@/lib/utils";

import type { AppointmentDetailModel } from "../domain/models/appointment-detail-model";
import type { AppointmentStatus } from "../domain/models/type";

type Props = {
  status: AppointmentStatus;
  datetime: Pick<AppointmentDetailModel, "date" | "time_from" | "time_to">;
};

function DatetimeAttetionAppointment({ status, datetime }: Props) {
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
        {dateHelper.format(dateHelper.parseISO(datetime.date), DateFormat["dd-MM-yyyy"])}
      </span>
      <span>
        {datetime.time_from}
        -
        {datetime.time_to}
      </span>
    </div>
  );
}

export { DatetimeAttetionAppointment };
