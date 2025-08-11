import { useQuery } from "@tanstack/react-query";

import { ProfessionalAppointmentInfo } from "@/app/professionals/components/professional-appointment-info";
import { Show } from "@/components/show";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import type { AppointmentModel } from "../../models/appointment-model";

import { STATUS_NAMES } from "../../constants";
import { AppointmentQueries } from "../../queries/appointment-queries";
import { AppointmentStatusIcon } from "../appoinment-status-icon";
import { DatetimeAttetionAppointment } from "../datetime-attetion-appointment";
import { AppointmentDetailForm } from "./appointment-detail-form";
import { AppointmentDetailFormActions } from "./appointment-detail-form-actions";

type Props = {
  appointmentUid: AppointmentModel["uid"];
};

function AppointmentDetail({ appointmentUid }: Props) {
  const { data, isError, error, isLoading } = useQuery(AppointmentQueries.getDetail(appointmentUid));

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const { alert, patient, professional, status, date, time_from, time_to } = data!;

  return (
    <aside className="pl-4 min-w-lg max-w-lg w-full space-y-4 ml-4 border-l flex flex-col">
      <div className="flex items-center w-full">
        <h3 className="text-xl w-72 truncate">
          <span className="min-w-max font-semibold mr-1.5">Cita ID:</span>
          {appointmentUid}
        </h3>

        <DefaultTooltip content="Copiar ID de cita">
          <CopyButton value={appointmentUid} />
        </DefaultTooltip>

        <Badge
          variant={status.toLocaleLowerCase() as any}
          className="px-0.5 pe-2 ml-auto"
        >
          <AppointmentStatusIcon status={status} />
          {STATUS_NAMES[status]}
        </Badge>
      </div>

      <DatetimeAttetionAppointment
        status={status}
        datetime={{
          time_from,
          time_to,
          date,
        }}
      />

      <ProfessionalAppointmentInfo professional={professional} />

      <Show when={alert.is_required}>
        <Alert>
          {alert.message}
          .
        </Alert>
      </Show>

      <AppointmentDetailForm patient={patient} />

      <AppointmentDetailFormActions />
    </aside>
  );
}

export { AppointmentDetail };
