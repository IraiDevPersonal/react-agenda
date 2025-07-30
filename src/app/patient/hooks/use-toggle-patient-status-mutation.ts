import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { DeletePatientServiceFn } from "../models/patient-action-model";
import type { PatientResponseModel } from "../models/patient-model";

import { PatientQueryOptions } from "../queries/patient-queries";
import { setPatientQueryData } from "../utils";
import { usePatientFilters } from "./use-patient-filters";

type Props = {
  deleteService: DeletePatientServiceFn;
  successFn: () => void;
};

export function useTogglePatientStatusMutation({ deleteService, successFn }: Props) {
  const queryClient = useQueryClient();
  const { filtersAsParams } = usePatientFilters();

  return useMutation({
    ...PatientQueryOptions.del(),
    mutationFn: (uid: string) => deleteService(uid),
    onSuccess: ({ message, data: patient }) => {
      const patientQueryData = setPatientQueryData(filtersAsParams);

      queryClient.setQueryData(
        patientQueryData.querykey,
        (old: PatientResponseModel) => patientQueryData.updateCache(old, patient),
      );
      toast.success(message);
      successFn();
    },
  });
}
