import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { UpsertPatientServiceFn } from "../models/patient-action-model";

import { PatientFormSchema } from "../models/patient-form-model";
import { PatientQueryOptions } from "../queries/patient-queries";

type Props = {
  upsertService: UpsertPatientServiceFn;
  patientUid?: string;
};

export function useUpsertPatientMutation({ upsertService, patientUid }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleBack = () => {
    navigate(-1);
  };

  const mutation = useMutation({
    ...PatientQueryOptions.upsert(),
    mutationFn: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formValues = Object.fromEntries(new FormData(e.target as any));
      const payload = PatientFormSchema.parse(formValues);

      return upsertService(payload);
    },
    onSuccess: () => {
      let message = "Paciente actualizado correctamente";

      if (!patientUid) {
        handleBack();
        message = "Paciente creado correctamente";
      }

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.patients] });
      toast.success(message);
    },
  });

  return {
    mutation,
    handleBack,
  };
}
