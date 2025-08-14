import { useQuery } from "@tanstack/react-query";

import { ProfessionalAppointmentInfo } from "@/app/professionals/components/professional-appointment-info";
import { Show } from "@/components/show";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { ErrorMessage } from "@/components/ui/error-message";
import { DefaultTooltip } from "@/components/ui/tooltip";

import { appointmentQuery } from "../../container";
import { STATUS_NAMES } from "../../lib/constants";
import { AppointmentStatusIcon } from "../appoinment-status-icon";
import { DatetimeAttetionAppointment } from "../datetime-attetion-appointment";
import { AppointmentDetailForm } from "./appointment-detail-form";
import { AppointmentDetailFormActions } from "./appointment-detail-form-actions";
import { AppointmentDetailSkeleton } from "./appointment-detail-skeleton";
import { AppointmentDetailWrapper } from "./appointment-detail-wrapper";

type Props = {
  appointmentUid: string;
};

function AppointmentDetail({ appointmentUid }: Props) {
  const {
    data,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery(appointmentQuery.detail(appointmentUid));

  if (isLoading) {
    return <AppointmentDetailSkeleton />;
  }

  if (isError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  if (!data) {
    return <ErrorMessage onRetry={refetch}>No se obtuvieron datos</ErrorMessage>;
  }

  const { alert, patient, professional, status, date, time_from, time_to } = data;

  return (
    <AppointmentDetailWrapper>
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
    </AppointmentDetailWrapper>
  );
}

export { AppointmentDetail };
