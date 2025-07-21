import { LucideMessageCircleQuestion } from "lucide-react";

import type { PatientForAppointmentDetailModel } from "@/app/patient/models/patient-model";

import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";

type Props = {
  id: string;
  patient: PatientForAppointmentDetailModel;
  withSearchPatient?: boolean;
};

function PatientForm({ patient, withSearchPatient = false, id }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    console.log(form);
  };

  return (
    <form className="grid grid-cols-2 gap-4 items-end" id={id} onSubmit={handleSubmit}>
      <h5 className="text-lg font-semibold col-span-2">Datos paciente:</h5>

      {withSearchPatient
        ? (
            <Search
              label="Rut (buscar paciente)"
              placeholder="Rut paciente"
              defaultValue={patient.rut}
              classNames={{
                input: "w-full",
              }}
            />
          )
        : (
            <FieldWrapper label="Rut">
              <Input placeholder="Rut paciente" defaultValue={patient.rut} />
            </FieldWrapper>
          )}

      {withSearchPatient
        ? (
            <DefaultTooltip content="si no se encuentra puede crear uno nuevo llenando todos los campos">
              <LucideMessageCircleQuestion size={24} className="text-blue-500 mb-2" />
            </DefaultTooltip>
          )
        : <span />}

      <FieldWrapper label="Nombres">
        <Input placeholder="Nombres paciente" defaultValue={patient.names} />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input placeholder="Apellidos paciente" defaultValue={patient.last_names} />
      </FieldWrapper>

      <FieldWrapper label="Correo">
        <Input placeholder="Correo paciente" defaultValue={patient.email} />
      </FieldWrapper>

      <FieldWrapper label="Teléfono">
        <Input placeholder="Teléfono paciente" defaultValue={patient.phone} />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input placeholder="Dirección paciente" defaultValue={patient.address} />
      </FieldWrapper>

      <FieldWrapper label="Forma de pago" classNames={{ root: "col-span-2" }}>
        <SelectNative />
      </FieldWrapper>
    </form>
  );
}

export { PatientForm };
