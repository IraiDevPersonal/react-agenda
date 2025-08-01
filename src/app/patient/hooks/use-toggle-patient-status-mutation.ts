import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { DeletePatientServiceFn } from "../models/patient-action-model";
import type { PatientResponseModel } from "../models/patient-model";

import { PatientQuery } from "../queries/patient-queries";
import { setPatientQueryData } from "../utils";
import { usePatientFilters } from "./use-patient-filters";

type Props = {
  toggleStatusService: DeletePatientServiceFn;
  successFn: () => void;
};

export function useTogglePatientStatusMutation({ toggleStatusService, successFn }: Props) {
  const queryClient = useQueryClient();
  const { params } = usePatientFilters();

  return useMutation({
    ...PatientQuery.toggleStatus(),
    mutationFn: (uid: string) => toggleStatusService(uid),
    onSuccess: ({ message, data: patient }) => {
      const patientQueryData = setPatientQueryData(params);

      queryClient.setQueryData(
        patientQueryData.querykey,
        (old: PatientResponseModel) => patientQueryData.updateCache(old, patient),
      );
      toast.success(message);
      successFn();
    },
  });
}
