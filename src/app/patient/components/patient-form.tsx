import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";

import type { PatientModel, UpsertActionState } from "@/app/patient/models/patient-model";

import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";

type Props = {
  upsertAction: (prevState: UpsertActionState, formData: FormData) => Promise<UpsertActionState>;
  patient?: PatientModel;
};

function PatientForm({
  patient,
  upsertAction,
}: Props) {
  const [
    state,
    formAction,
    isPending,
  ] = useActionState(upsertAction, {
    data: patient,
    success: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!patient && state.success) {
      navigate(-1);
    }
  }, [state.success, patient, navigate]);

  return (
    <form
      className="grid grid-cols-2 gap-4 items-end w-full [&>div]:col-span-2"
      action={formAction}
    >
      <h5 className="text-lg font-semibold col-span-2">Datos paciente:</h5>

      <FieldWrapper label="Rut" classNames={{ root: "!col-span-1" }}>
        <Input
          name="rut"
          disabled={isPending}
          placeholder="Rut paciente"
          defaultValue={state.data?.rut}
          key={state.data?.rut}
        />
      </FieldWrapper>

      <FieldWrapper label="Teléfono" classNames={{ root: "!col-span-1" }}>
        <Input
          name="phone"
          placeholder="Teléfono paciente"
          defaultValue={state.data?.phone}
          key={state.data?.phone}
        />
      </FieldWrapper>

      <FieldWrapper label="Nombres">
        <Input
          name="names"
          placeholder="Nombres paciente"
          defaultValue={state.data?.names}
          key={state.data?.names}
        />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input
          name="last_names"
          placeholder="Apellidos paciente"
          defaultValue={state.data?.last_names}
          key={state.data?.last_names}
        />
      </FieldWrapper>

      <FieldWrapper label="Correo">
        <Input
          name="email"
          type="email"
          placeholder="Correo paciente"
          defaultValue={state.data?.email}
          key={state.data?.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input
          name="address"
          placeholder="Dirección paciente"
          defaultValue={state.data?.address}
          key={state.data?.address}
        />
      </FieldWrapper>

      <Button variant="secondary" onClick={() => navigate(-1)} disabled={isPending}>
        Volver
      </Button>
      <Button type="submit" disabled={isPending}>
        Guardar
      </Button>
    </form>
  );
}

export { PatientForm };
