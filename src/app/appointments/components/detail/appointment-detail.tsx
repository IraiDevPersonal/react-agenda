import { useQuery } from "@tanstack/react-query";

import { ProfessionalInfoForAppointment } from "@/app/professionals/components/professional-info-for-appointment";
import { Show } from "@/components/show";
import { Alert } from "@/components/ui/alert";
import { ErrorMessage } from "@/components/ui/error-message";

import { appointmentQuery } from "../../container";
import { AppointmentHours } from "../appointment-hours";
import { AppointmentDetailForm } from "./appointment-detail-form";
import { AppointmentDetailFormActions } from "./appointment-detail-form-actions";
import { AppointmentDetailInfo } from "./appointment-detail-info";
import { AppointmentDetailSkeleton } from "./appointment-detail-skeleton";
import { AppointmentDetailWrapper } from "./appointment-detail-wrapper";

type Props = {
  uid: string;
};

function AppointmentDetail({ uid }: Props) {
  const {
    data,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery(appointmentQuery.detail(uid));

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
      <AppointmentDetailInfo uid={uid} status={status} />

      <AppointmentHours datetime={{ time_from, time_to, date }} />

      <ProfessionalInfoForAppointment professional={professional} />

      <Show when={alert.is_required}>
        <Alert>
          {alert.message}
        </Alert>
      </Show>

      <AppointmentDetailForm patient={patient} />

      <AppointmentDetailFormActions />
    </AppointmentDetailWrapper>
  );
}

export { AppointmentDetail };
