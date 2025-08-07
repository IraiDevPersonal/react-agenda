import type { PropsWithChildren } from "react";

import { useNavigate } from "react-router";

import { RutInput } from "@/components/ui/rut-input";
import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";

import type { ProfessionalModel } from "../models/professional-model";

type Props = PropsWithChildren<{
  // upsertService: UpsertPatientServiceFn;
  professional?: ProfessionalModel;
}>;

function ProfessionalForm({ professional, children }: Props) {
  // const {
  //   mutation,
  //   handleBack,
  // } = useUpsertPatientMutation({
  //   professionalUid: professional?.uid,
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
      <h5 className="text-lg font-semibold col-span-2">Datos del profesional:</h5>

      <FieldWrapper label="Rut" classNames={{ root: "!col-span-1" }}>
        <RutInput
          // disabled={mutation.isPending}
          defaultValue={professional?.rut}
          key={professional?.rut}
        />
      </FieldWrapper>

      <FieldWrapper label="Teléfono" classNames={{ root: "!col-span-1" }}>
        <Input
          name="phone"
          placeholder="Teléfono del profesional"
          defaultValue={professional?.phone}
          // disabled={mutation.isPending}
          key={professional?.phone}
        />
      </FieldWrapper>

      <FieldWrapper label="Nombres">
        <Input
          name="names"
          placeholder="Nombres del profesional"
          defaultValue={professional?.names}
          // disabled={mutation.isPending}
          key={professional?.names}
        />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input
          name="last_names"
          placeholder="Apellidos del profesional"
          defaultValue={professional?.last_names}
          // disabled={mutation.isPending}
          key={professional?.last_names}
        />
      </FieldWrapper>

      <FieldWrapper label="Correo">
        <Input
          name="email"
          type="email"
          placeholder="Correo del profesional"
          defaultValue={professional?.email}
          // disabled={mutation.isPending}
          key={professional?.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input
          name="address"
          placeholder="Dirección del profesional"
          defaultValue={professional?.address}
          // disabled={mutation.isPending}
          key={professional?.address}
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

export { ProfessionalForm };
