import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { notification } from "@/lib/notification";

import type { TogglePatientStatusServiceFn } from "../models/patient-action-model";

import { PatientQuery } from "../queries/patient-queries";

type Props = {
  toggleStatusService: TogglePatientStatusServiceFn;
  successFn: () => void;
};

export function useTogglePatientStatusMutation({ toggleStatusService, successFn }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    ...PatientQuery.toggleStatus(),
    mutationFn: (uid: string) => toggleStatusService(uid),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.patients] });
      notification.success(message);
      successFn();
    },
  });
}
