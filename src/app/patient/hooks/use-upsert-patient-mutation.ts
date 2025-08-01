import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/query-keys";

import type { UpsertPatientServiceFn } from "../models/patient-action-model";
import type { PatientResponseModel } from "../models/patient-model";

import { PatientFormSchema } from "../models/patient-form-model";
import { PatientQuery } from "../queries/patient-queries";
import { setPatientQueryData } from "../utils";
import { usePatientFilters } from "./use-patient-filters";

type Props = {
  upsertService: UpsertPatientServiceFn;
  patientUid?: string;
};

export function useUpsertPatientMutation({ upsertService, patientUid }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { params } = usePatientFilters();

  const handleBack = () => {
    navigate(-1);
  };

  const mutation = useMutation({
    ...PatientQuery.upsert(),
    mutationFn: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formValues = Object.fromEntries(new FormData(e.target as any));
      const payload = PatientFormSchema.parse(formValues);

      return upsertService(payload);
    },
    onSuccess: ({ data: patient }) => {
      let message = "Paciente actualizado correctamente";

      if (!patientUid) {
        message = "Paciente creado correctamente";

        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.patients] });
        handleBack();
      }
      else {
        const patientQueryData = setPatientQueryData(params);

        queryClient.setQueryData(
          patientQueryData.querykey,
          (old: PatientResponseModel) => patientQueryData.updateCache(old, patient),
        );
      }
      toast.success(message);
    },
  });

  return {
    mutation,
    handleBack,
  };
}
