import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { DeletePatientServiceFn } from "../models/patient-action-model";

import { PatientQueryOptions } from "../queries/patient-queries";

type Props = {
  deleteService: DeletePatientServiceFn;
  successFn: () => void;
};

export function useTogglePatientStatusMutation({ deleteService, successFn }: Props) {
  const queryClient = useQueryClient();

  return useMutation({
    ...PatientQueryOptions.del(),
    mutationFn: (uid: string) => deleteService(uid),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.patients] });
      // FIXME: trabajar en esto para optmizar consultas innecesarias al BE
      // queryClient.setQueryData([QUERY_KEYS.patients], (prev: PatientResponseModel) => ({
      //   ...prev,
      //   data: prev.data.filter(patient => patient.uid !== uid),
      // }));
      toast.success(message);
      successFn();
    },
  });
}
