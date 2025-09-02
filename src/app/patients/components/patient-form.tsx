import { Loader2Icon } from "lucide-react";

import { USER_GENDER_OPTIONS } from "@/app/users/utils/constants";
import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { RutInput } from "@/components/ui/rut-input";
import { SelectNative } from "@/components/ui/select-native";

import type { UpsertPatientServiceFn } from "../models/patient-action-model";
import type { PatientDetailModel } from "../models/patient-detail-model";

import { useUpsertPatientMutation } from "../hooks/use-upsert-patient-mutation";
import { DateFormat, dateHelper } from "@/lib/date-helper";

type Props = {
  upsertService: UpsertPatientServiceFn;
  patient?: PatientDetailModel;
};

function PatientForm({ patient, upsertService }: Props) {
  const {
    mutation,
    handleBack,
  } = useUpsertPatientMutation({
    patientUid: patient?.uid,
    upsertService,
  });

  return (
    <form
      className="grid grid-cols-2 gap-4 items-end w-full [&>div]:col-span-2"
      onSubmit={mutation.mutate}
    >
      <h5 className="text-lg font-semibold col-span-2">Datos del paciente:</h5>

      <FieldWrapper label="Rut" classNames={{ root: "!col-span-1" }}>
        <RutInput
          disabled={mutation.isPending}
          defaultValue={patient?.rut}
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

      <FieldWrapper label="Fecha de nacimiento">
        <Input
        type="date"
          name="birth_date"
          placeholder="Fecha de nacimiento del paciente"
          defaultValue={patient?.birth_date
            ? dateHelper.format(patient?.birth_date, DateFormat["yyyy-MM-dd"])
            : undefined}
          disabled={mutation.isPending}
          key={patient?.birth_date.toDateString()}
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

      <FieldWrapper label="Sexo" classNames={{ root: "col-span-2" }}>
        <SelectNative
          name="gender"
          defaultValue={patient?.gender}
          // disabled={mutation.isPending}
          options={USER_GENDER_OPTIONS}
          key={patient?.gender}
        />
      </FieldWrapper>

      <Button variant="secondary" onClick={handleBack} disabled={mutation.isPending}>
        Volver
      </Button>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending && (
          <Loader2Icon className="text-inherit animate-spin" size={20} />
        )}
        <span>
          {mutation.isPending ? "Guardando..." : "Guardar"}
        </span>
      </Button>
    </form>
  );
}

export { PatientForm };
