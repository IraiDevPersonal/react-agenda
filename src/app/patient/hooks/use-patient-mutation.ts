import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import type { UpsertServiceFn } from "../models/patient-action-model";

import { PatientFormSchema } from "../models/patient-form-model";

type Props = {
  upsertService: UpsertServiceFn;
  patientUid?: string;
};

export function usePatientMutation({ upsertService, patientUid }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleBack = () => {
    navigate(-1);
  };

  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.patients],
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
