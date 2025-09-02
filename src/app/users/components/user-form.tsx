import type { PropsWithChildren } from "react";

import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { RutInput } from "@/components/ui/rut-input";

import type { UserModel } from "../models/user-model";

type Props = PropsWithChildren<{
  // upsertService: UpsertPatientServiceFn;
  user?: UserModel;
}>;

function UserForm({ user, children }: Props) {
  // const {
  //   mutation,
  //   handleBack,
  // } = useUpsertPatientMutation({
  //   userUid: user?.uid,
  //   upsertService,
  // });
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form
      className="grid grid-cols-2 gap-4 items-end w-full [&>div]:col-span-2"
      // onSubmit={mutation.mutate}
    >
      <h5 className="text-lg font-semibold col-span-2">Datos del user:</h5>

      <FieldWrapper label="Rut" classNames={{ root: "!col-span-1" }}>
        <RutInput
          // disabled={mutation.isPending}
          defaultValue={user?.rut}
          key={user?.rut}
        />
      </FieldWrapper>

      <FieldWrapper label="Teléfono" classNames={{ root: "!col-span-1" }}>
        <Input
          name="phone"
          placeholder="Teléfono del user"
          defaultValue={user?.phone}
          // disabled={mutation.isPending}
          key={user?.phone}
        />
      </FieldWrapper>

      <FieldWrapper label="Nombres">
        <Input
          name="names"
          placeholder="Nombres del user"
          defaultValue={user?.names}
          // disabled={mutation.isPending}
          key={user?.names}
        />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input
          name="last_names"
          placeholder="Apellidos del user"
          defaultValue={user?.last_names}
          // disabled={mutation.isPending}
          key={user?.last_names}
        />
      </FieldWrapper>

      <FieldWrapper label="Correo">
        <Input
          name="email"
          type="email"
          placeholder="Correo del user"
          defaultValue={user?.email}
          // disabled={mutation.isPending}
          key={user?.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input
          name="address"
          placeholder="Dirección del user"
          defaultValue={user?.address}
          // disabled={mutation.isPending}
          key={user?.address}
        />
      </FieldWrapper>

      {children}

      <Button
        variant="secondary"
        onClick={handleBack}
      // disabled={mutation.isPending}
      >
        Volver
      </Button>

      <Button type="submit"
      // disabled={mutation.isPending}
      >
        {/* {mutation.isPending && (
          <Loader2Icon className="text-inherit animate-spin" size={20} />
        )} */}
        <span>
          Guardar
          {/* {mutation.isPending ? "Guardando..." : "Guardar"} */}
        </span>
      </Button>
    </form>
  );
}

export { UserForm };
