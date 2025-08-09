import { useState } from "react";

import { ButtonWithAlertDialog } from "@/components/ui/button-with-alert-button";

import type { ProfessionalModel } from "../domain/models/professional-model";

import { useQueryProfessionals } from "../hooks/use-query-professionals";
import { ProfessionalQueries } from "../queries";

type Props = {
  professional: ProfessionalModel;
};

function ToggleProfessionalStatusButton({ professional }: Props) {
  const [open, setOpen] = useState(false);
  // const mutation = useTogglePatientStatusMutation({
  //   toggleStatusService: PatientServices.toggleStatus,
  //   successFn: () => setOpen(false),
  // });
  const { isFetching: isPatientFetching } = useQueryProfessionals({
    queryOptions: ProfessionalQueries.getLoaderState,
  });

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
