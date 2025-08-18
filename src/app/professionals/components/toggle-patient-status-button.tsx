import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ButtonWithAlertDialog } from "@/components/ui/button-with-alert-button";

import type { ProfessionalModel } from "../models/professional-model";

import { professionalQuery } from "../container";
import { useProfessionalFilters } from "../hooks/use-professional-filters";

type Props = {
  professional: ProfessionalModel;
};

function ToggleProfessionalStatusButton({ professional }: Props) {
  const [open, setOpen] = useState(false);
  // const mutation = useTogglePatientStatusMutation({
  //   toggleStatusService: PatientServices.toggleStatus,
  //   successFn: () => setOpen(false),
  // });
  const { filters } = useProfessionalFilters();
  const { isFetching: isPatientFetching } = useQuery(professionalQuery.forLoader(filters));

  return (
    <ButtonWithAlertDialog
      // icon={professional.is_deleted ? <UserRoundCheckIcon size={20} /> : <UserRoundXIcon size={20} />}
      // buttonsLabel={{ action: `${professional.is_deleted ? "Habilitar" : "Deshabilitar"} professional` }}
      disabled={isPatientFetching}
      onAction={() => {
        // mutation.mutate(professional.uid)
      }}
      // isLoading={mutation.isPending}
      onOpenChange={setOpen}
      open={open}
    >
      Professional
      <strong className="font-semibold">
        {" "}
        {professional.names}
        {" "}
        {professional.last_names}
        {" "}
      </strong>
      sera
      {" "}
      {/* <strong>{professional.is_deleted ? "habilitado" : "deshabilitado"}</strong> */}
      .
    </ButtonWithAlertDialog>
  );
}

export { ToggleProfessionalStatusButton };
