import type { PatientModel } from "@/app/patient/models/patient-model";

type Props = {
  patient?: Omit<PatientModel, "is_deleted"> | null;
};

function AppointmentDetailForm({ patient }: Props) {
  return (
    <pre>
      {JSON.stringify(patient, null, 2)}
    </pre>
  );
}

export { AppointmentDetailForm };
