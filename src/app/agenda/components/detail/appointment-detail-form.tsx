import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";

import type { OneAppointment } from "../../types/appointment";

type Props = {
  patient: OneAppointment["patient"];
};

function AppointmentDetailForm({ patient }: Props) {
  return (
    <form className="grid grid-cols-2 gap-4">
      <h5 className="text-lg font-semibold col-span-2">Datos paciente:</h5>

      <FieldWrapper label="Rut">
        <Input placeholder="Rut paciente" defaultValue={patient.rut} />
      </FieldWrapper>

      <FieldWrapper label="Teléfono">
        <Input placeholder="Teléfono paciente" defaultValue={patient.phone} />
      </FieldWrapper>

      <FieldWrapper label="Nombres">
        <Input placeholder="Nombres paciente" defaultValue={patient.full_name} />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input placeholder="Apellidos paciente" defaultValue={patient.full_name} />
      </FieldWrapper>

      <FieldWrapper label="Correo" classNames={{ root: "col-span-2" }}>
        <Input placeholder="Correo paciente" defaultValue={patient.email} />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input placeholder="Dirección paciente" />
      </FieldWrapper>

      <FieldWrapper label="Forma de pago" classNames={{ root: "col-span-2" }}>
        <SelectNative />
      </FieldWrapper>
    </form>
  );
}

export { AppointmentDetailForm };
