import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ButtonWithAlertDialog } from "@/components/ui/button-with-alert-button";

import type { UserModel } from "../models/user-model";

import { userQuery } from "../container";
import { useUserFilters } from "../hooks/use-user-filters";

type Props = {
  user: UserModel;
};

function ToggleUserStatusButton({ user }: Props) {
  const [open, setOpen] = useState(false);
  // const mutation = useTogglePatientStatusMutation({
  //   toggleStatusService: PatientServices.toggleStatus,
  //   successFn: () => setOpen(false),
  // });
  const { filters } = useUserFilters();
  const { isFetching: isPatientFetching } = useQuery(userQuery.forLoader(filters));

  return (
    <ButtonWithAlertDialog
      // icon={user.is_deleted ? <UserRoundCheckIcon size={20} /> : <UserRoundXIcon size={20} />}
      // buttonsLabel={{ action: `${user.is_deleted ? "Habilitar" : "Deshabilitar"} user` }}
      disabled={isPatientFetching}
      onAction={() => {
        // mutation.mutate(user.uid)
      }}
      // isLoading={mutation.isPending}
      onOpenChange={setOpen}
      open={open}
    >
      User
      <strong className="font-semibold">
        {" "}
        {user.names}
        {" "}
        {user.last_names}
        {" "}
      </strong>
      sera
      {" "}
      {/* <strong>{user.is_deleted ? "habilitado" : "deshabilitado"}</strong> */}
      .
    </ButtonWithAlertDialog>
  );
}

export { ToggleUserStatusButton };
