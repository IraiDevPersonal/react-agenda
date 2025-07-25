import type { PatientForAppointmentDetailModel } from "@/app/patient/models/patient-model";

type Props = {
  patient?: PatientForAppointmentDetailModel;
};

function AppointmentDetailForm({ patient }: Props) {
  return (
    <pre>
      {JSON.stringify(patient, null, 2)}
    </pre>
  );
}

export { AppointmentDetailForm };
