import { useQuery } from "@tanstack/react-query";
import { UserRoundCheckIcon, UserRoundXIcon } from "lucide-react";
import { useState } from "react";
import { UserStatus } from "@/app/users/models/shared-model";
import { ButtonWithAlertDialog } from "@/components/ui/button-with-alert-button";
import { patientQuery, patientService } from "../container";
import { usePatientFilters } from "../hooks/use-patient-filters";
import { useTogglePatientStatusMutation } from "../hooks/use-toggle-patient-status-mutation";
import type { PatientModel } from "../models/patient-model";

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
  const { isFetching: isPatientFetching } = useQuery(
    patientQuery.forLoader(filters),
  );

  return (
    <ButtonWithAlertDialog
      icon={
        patient.status === UserStatus.ACTIVE ? (
          <UserRoundCheckIcon size={20} />
        ) : (
          <UserRoundXIcon size={20} />
        )
      }
      buttonsLabel={{
        action: `${patient.status === UserStatus.ACTIVE ? "Habilitar" : "Deshabilitar"} paciente`,
      }}
      disabled={isPatientFetching || mutation.isPending}
      onAction={() => mutation.mutate(patient.uid)}
      isLoading={mutation.isPending}
      onOpenChange={setOpen}
      open={open}
    >
      Paciente
      <strong className="font-semibold">
        {" "}
        {patient.names} {patient.last_names}{" "}
      </strong>
      sera{" "}
      <strong>
        {patient.status === UserStatus.ACTIVE ? "habilitado" : "deshabilitado"}
      </strong>
      .
    </ButtonWithAlertDialog>
  );
}

export { TogglePatientStatusButton };
