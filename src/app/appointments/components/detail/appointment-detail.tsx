import { useQuery } from "@tanstack/react-query";

import { PatientInfoForAppointment } from "@/app/patients/components/patient-info-for-appointment";
import { UserInfoForAppointment } from "@/app/users/components/user-info-for-appointment";
import { Show } from "@/components/show";
import { Alert } from "@/components/ui/alert";
import { ErrorMessage } from "@/components/ui/error-message";

import { appointmentQuery } from "../../container";
import { AppointmentStatus } from "../../models/shared-model";
import { AppointmentHours } from "../appointment-hours";
import { AppointmentDetailFormActions } from "./appointment-detail-form-actions";
import { AppointmentDetailInfo } from "./appointment-detail-info";
import { AppointmentDetailSkeleton } from "./appointment-detail-skeleton";
import { AppointmentDetailWrapper } from "./appointment-detail-wrapper";
import { AvailableAppointmentDetailForm } from "./available-appointment-detail-form";
import { ToConfirmAppointmentDetailForm } from "./to-confirm-appointment-detail-form";

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

  const { alert, patient, professional: user, status, date, time_from, time_to } = data;

  return (
    <AppointmentDetailWrapper>
      <AppointmentDetailInfo uid={uid} status={status} />

      <AppointmentHours datetime={{ time_from, time_to, date }} />

      <UserInfoForAppointment user={user} />

      <Show when={alert.is_required}>
        <Alert>
          {alert.message}
        </Alert>
      </Show>

      <Show when={status === AppointmentStatus.AVAILABLE}>
        <AvailableAppointmentDetailForm patient={patient} />
      </Show>

      <Show when={status !== AppointmentStatus.AVAILABLE}>
        <PatientInfoForAppointment patient={patient} />
      </Show>

      <Show when={status === AppointmentStatus.TO_CONFIRM}>
        <ToConfirmAppointmentDetailForm pay_method="" />
      </Show>

      <AppointmentDetailFormActions uid={uid} />
    </AppointmentDetailWrapper>
  );
}

export { AppointmentDetail };
