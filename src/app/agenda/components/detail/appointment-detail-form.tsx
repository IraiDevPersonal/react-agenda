import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";

import type { OneAppointment } from "../../types/one-appointment";

import { APPOINTMENT_DETAIL_FORM_ID } from "../../constants";

type Props = {
  patient: OneAppointment["patient"];
};

function AppointmentDetailForm({ patient }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget));
    console.log(form);
  };

  return (
    <form className="grid grid-cols-2 gap-4" id={APPOINTMENT_DETAIL_FORM_ID} onSubmit={handleSubmit}>
      <h5 className="text-lg font-semibold col-span-2">Datos paciente:</h5>

      <FieldWrapper label="Rut">
        <Input placeholder="Rut paciente" defaultValue={patient.rut} />
      </FieldWrapper>

      <FieldWrapper label="Teléfono">
        <Input placeholder="Teléfono paciente" defaultValue={patient.phone} />
      </FieldWrapper>

      <FieldWrapper label="Nombres">
        <Input placeholder="Nombres paciente" defaultValue={patient.names} />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input placeholder="Apellidos paciente" defaultValue={patient.lastnames} />
      </FieldWrapper>

      <FieldWrapper label="Correo" classNames={{ root: "col-span-2" }}>
        <Input placeholder="Correo paciente" defaultValue={patient.email} />
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

export { AppointmentDetailForm };
