import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";

function AppointmentDetailForm() {
  return (
    <form className="grid grid-cols-2 gap-4">
      <h5 className="text-lg font-semibold col-span-2">Datos paciente:</h5>

      <FieldWrapper label="Rut">
        <Input placeholder="Rut paciente" />
      </FieldWrapper>

      <FieldWrapper label="Teléfono">
        <Input placeholder="Teléfono paciente" />
      </FieldWrapper>

      <FieldWrapper label="Nombre">
        <Input placeholder="Nombre paciente" />
      </FieldWrapper>

      <FieldWrapper label="Apellido">
        <Input placeholder="Apellido paciente" />
      </FieldWrapper>

      <FieldWrapper label="Correo" classNames={{ root: "col-span-2" }}>
        <Input placeholder="Correo paciente" />
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
