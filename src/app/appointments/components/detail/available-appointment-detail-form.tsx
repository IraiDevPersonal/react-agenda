import type { PatientForAppointmentDetailModel } from "@/app/patients/models/patient-for-appointment-detail-model";

import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { RutInput } from "@/components/ui/rut-input";
import { SelectNative } from "@/components/ui/select-native";

import { APPOINTMENT_DETAIL_FORM_ID } from "../../utils/constants";

type Props = {
  patient?: PatientForAppointmentDetailModel | null;
};

function AvailableAppointmentDetailForm({ patient }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    console.log("formValues", Object.fromEntries(formValues));
  };

  return (
    <form
      id={APPOINTMENT_DETAIL_FORM_ID}
      className="grid grid-cols-2 gap-4 items-end w-full [&>div]:col-span-2"
      onSubmit={onSubmit}
      // onSubmit={mutation.mutate}
    >
      <h5 className="text-lg font-semibold col-span-2">Datos del paciente:</h5>

      <FieldWrapper label="Rut" classNames={{ root: "!col-span-1" }}>
        <RutInput
          // disabled={mutation.isPending}
          defaultValue={patient?.rut}
          key={patient?.rut}
        />
      </FieldWrapper>

      <FieldWrapper label="Teléfono" classNames={{ root: "!col-span-1" }}>
        <Input
          name="phone"
          placeholder="Teléfono del paciente"
          defaultValue={patient?.phone ? patient.phone : "+569"}
          // disabled={mutation.isPending}
          key={patient?.phone}
        />
      </FieldWrapper>

      <FieldWrapper label="Nombres">
        <Input
          name="names"
          placeholder="Nombres del paciente"
          defaultValue={patient?.names}
          // disabled={mutation.isPending}
          key={patient?.names}
        />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input
          name="last_names"
          placeholder="Apellidos del paciente"
          defaultValue={patient?.last_names}
          // disabled={mutation.isPending}
          key={patient?.last_names}
        />
      </FieldWrapper>

      <FieldWrapper label="Correo">
        <Input
          name="email"
          type="email"
          placeholder="Correo del paciente"
          defaultValue={patient?.email}
          // disabled={mutation.isPending}
          key={patient?.email}
        />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input
          name="address"
          placeholder="Dirección del paciente"
          defaultValue={patient?.address}
          // disabled={mutation.isPending}
          key={patient?.address}
        />
      </FieldWrapper>

      <FieldWrapper label="Forma de pago" classNames={{ root: "col-span-2" }}>
        <SelectNative
          name="pay_method"
          options={[
            { value: "fonasa", label: "Bono Fonasa" },
            { value: "particular", label: "Particular" },
          ]}
          // defaultValue={patient?.address}
          // disabled={mutation.isPending}
          // key={patient?.address}
        />
      </FieldWrapper>
    </form>
  );
}

export { AvailableAppointmentDetailForm };
