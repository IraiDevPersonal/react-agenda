import type { PatientForAppointmentDetailModel } from "@/app/patient/models/patient-model";

import { PatientForm } from "@/app/patient/components/patient-form";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { SelectNative } from "@/components/ui/select-native";

import { APPOINTMENT_DETAIL_FORM_ID } from "../../constants";

type Props = {
  patient?: PatientForAppointmentDetailModel;
};

function AppointmentDetailForm({ patient }: Props) {
  return (
    <PatientForm withSearchPatient id={APPOINTMENT_DETAIL_FORM_ID} patient={patient}>
      <FieldWrapper label="Forma de pago" classNames={{ root: "col-span-2" }}>
        <SelectNative />
      </FieldWrapper>
    </PatientForm>
  );
}

export { AppointmentDetailForm };
