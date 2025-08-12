import { useQuery } from "@tanstack/react-query";
import { UserRoundCheckIcon, UserRoundXIcon } from "lucide-react";
import { useState } from "react";

import { ButtonWithAlertDialog } from "@/components/ui/button-with-alert-button";

import type { PatientModel } from "../domain/models/patient-model";

import { patientQuery, patientService } from "../container";
import { usePatientFilters } from "../hooks/use-patient-filters";
import { useTogglePatientStatusMutation } from "../hooks/use-toggle-patient-status-mutation";

type Props = {
  patient: PatientModel;
};

function TogglePatientStatusButton({ patient }: Props) {
  const [open, setOpen] = useState(false);
  const mutation = useTogglePatientStatusMutation({
    toggleStatusService: patientService.togglePatientStatus,
    successFn: () => setOpen(false),
  });
  const { filters } = usePatientFilters();
  const { isFetching: isPatientFetching } = useQuery(patientQuery.forLoader(filters));

  return (
    <ButtonWithAlertDialog
      icon={patient.is_deleted ? <UserRoundCheckIcon size={20} /> : <UserRoundXIcon size={20} />}
      buttonsLabel={{ action: `${patient.is_deleted ? "Habilitar" : "Deshabilitar"} paciente` }}
      disabled={isPatientFetching || mutation.isPending}
      onAction={() => mutation.mutate(patient.uid)}
      isLoading={mutation.isPending}
      onOpenChange={setOpen}
      open={open}
    >
      Paciente
      <strong className="font-semibold">
        {" "}
        {patient.names}
        {" "}
        {patient.last_names}
        {" "}
      </strong>
      sera
      {" "}
      <strong>{patient.is_deleted ? "habilitado" : "deshabilitado"}</strong>
      .
    </ButtonWithAlertDialog>
  );
}

export { TogglePatientStatusButton };
