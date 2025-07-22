import type { PropsWithChildren } from "react";

import { LucideMessageCircleQuestion } from "lucide-react";

import type { PatientForAppointmentDetailModel } from "@/app/patient/models/patient-model";

import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Input } from "@/components/ui/input";
import { Search } from "@/components/ui/search";
import { DefaultTooltip } from "@/components/ui/tooltip";

type Props = PropsWithChildren<{
  patient?: PatientForAppointmentDetailModel;
  withSearchPatient?: boolean;
  id?: string;
}>;

function PatientForm({ patient, withSearchPatient = false, id, children }: Props) {
  return (
    <form className="grid grid-cols-2 gap-4 items-end" id={id}>
      <h5 className="text-lg font-semibold col-span-2">Datos paciente:</h5>

      {withSearchPatient
        ? (
            <Search
              label="Rut (buscar paciente)"
              placeholder="Rut paciente"
              defaultValue={patient?.rut}
              classNames={{
                input: "w-full",
              }}
            />
          )
        : (
            <FieldWrapper label="Rut">
              <Input placeholder="Rut paciente" defaultValue={patient?.rut} />
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
        <Input placeholder="Nombres paciente" defaultValue={patient?.names} />
      </FieldWrapper>

      <FieldWrapper label="Apellidos">
        <Input placeholder="Apellidos paciente" defaultValue={patient?.last_names} />
      </FieldWrapper>

      <FieldWrapper label="Correo">
        <Input placeholder="Correo paciente" defaultValue={patient?.email} />
      </FieldWrapper>

      <FieldWrapper label="Teléfono">
        <Input placeholder="Teléfono paciente" defaultValue={patient?.phone} />
      </FieldWrapper>

      <FieldWrapper label="Dirección" classNames={{ root: "col-span-2" }}>
        <Input placeholder="Dirección paciente" defaultValue={patient?.address} />
      </FieldWrapper>
      {children}
    </form>
  );
}

export { PatientForm };
