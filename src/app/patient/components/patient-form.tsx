import type { PatientModel } from "@/app/patient/models/patient-model";

import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";

import type { UpsertServiceModel } from "../models/patient-action-model";

import { usePatientMutation } from "../hooks/use-patient-mutation";

type Props = {
  upsertService: UpsertServiceModel;
  patient?: PatientModel;
};

function PatientForm({ patient, upsertService }: Props) {
  const {
    mutation,
    handleBack,
  } = usePatientMutation({
    patientUid: patient?.uid,
    upsertService,
  });

  return (
    <form
      className="grid grid-cols-2 gap-4 items-end w-full [&>div]:col-span-2"
      action={mutation.mutate}
    >
      <h5 className="text-lg font-semibold col-span-2">Datos paciente:</h5>

      <FieldWrapper label="Rut" classNames={{ root: "!col-span-1" }}>
        <Input
          name="rut"
          placeholder="Rut paciente"
          defaultValue={patient?.rut}
          disabled={mutation.isPending}
          key={patient?.rut}
        />
      </FieldWrapper>

      <FieldWrapper label="Teléfono" classNames={{ root: "!col-span-1" }}>
        <Input
          name="phone"
          placeholder="Teléfono del paciente"
          defaultValue={patient?.phone}
          disabled={mutation.isPending}
          key={patient?.phone}
        />
      </FieldWrapper>

      <FieldWrapper label="Nombres">
        <Input
          name="names"
          placeholder="Nombres del paciente"
          defaultValue={patient?.names}
          disabled={mutation.isPending}
          key={patient?.names}
        />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input
          name="last_names"
          placeholder="Apellidos del paciente"
          defaultValue={patient?.last_names}
          disabled={mutation.isPending}
          key={patient?.last_names}
        />
      </FieldWrapper>

      <FieldWrapper label="Correo">
        <Input
          name="email"
          type="email"
          placeholder="Correo del paciente"
          defaultValue={patient?.email}
          disabled={mutation.isPending}
          key={patient?.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input
          name="address"
          placeholder="Dirección del paciente"
          defaultValue={patient?.address}
          disabled={mutation.isPending}
          key={patient?.address}
        />
      </FieldWrapper>

      <Button variant="secondary" onClick={handleBack} disabled={mutation.isPending}>
        Volver
      </Button>
      <Button type="submit" disabled={mutation.isPending}>
        Guardar
      </Button>
    </form>
  );
}

export { PatientForm };
