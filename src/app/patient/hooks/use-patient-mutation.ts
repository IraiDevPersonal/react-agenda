import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { QueryKeys } from "@/constants/query-keys";

import type { UpsertServiceModel } from "../models/patient-action-model";

import { PatientFormSchema } from "../models/patient-form-model";

type Props = {
  upsertService: UpsertServiceModel;
  patientUid?: string;
};

export function usePatientMutation({ upsertService, patientUid }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleBack = () => {
    navigate(-1);
  };

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      const form = Object.fromEntries(formData);
      const payload = PatientFormSchema.parse(form);

      return upsertService(payload);
    },
    onSuccess: () => {
      let message = "Paciente actualizado correctamente";

      if (!patientUid) {
        handleBack();
        message = "Paciente creado correctamente";
      }

      queryClient.invalidateQueries({ queryKey: [QueryKeys.patients] });
      toast.success(message);
    },
  });

  return {
    mutation,
    handleBack,
  };
}
