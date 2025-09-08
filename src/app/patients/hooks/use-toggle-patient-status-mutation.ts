import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_STATUS_NAMES } from "@/app/users/utils/constants";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { notification } from "@/lib/notification";
import { patientQuery } from "../container";
import type { TogglePatientStatusServiceFn } from "../models/patient-action-model";

type Props = {
  toggleStatusService: TogglePatientStatusServiceFn;
  successFn: () => void;
};

export function useTogglePatientStatusMutation({
  toggleStatusService,
  successFn,
}: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    ...patientQuery.toggleStatusMutation(),
    mutationFn: (uid: string) => toggleStatusService(uid),
    onSuccess: ({ data: { names, last_names, status } }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.patients] });
      notification.success(
        `El paciente ${names} ${last_names} ha sido ${USER_STATUS_NAMES[status]}`,
      );
      successFn();
    },
  });
}
