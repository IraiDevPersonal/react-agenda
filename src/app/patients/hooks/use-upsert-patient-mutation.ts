import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { notification } from "@/lib/notification";

import type { UpsertPatientServiceFn } from "../models/patient-action-model";

import { patientQuery } from "../container";
import { PatientFormSchema } from "../schemas/form/patient-form-schema";

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
    ...patientQuery.upsertMutation(),
    mutationFn: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formValues = Object.fromEntries(new FormData(e.target as any));
      const payload = PatientFormSchema.parse(formValues);

      return upsertService(payload);
    },
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.patients] });
      notification.success(message);

      if (!patientUid) {
        handleBack();
      }
    },
  });

  return {
    mutation,
    handleBack,
  };
}
