import { TextItem } from "@/components/ui/text-item";

import type { PatientForAppointmentDetailModel } from "../models/patient-for-appointment-detail-model";

type Props = {
  patient: PatientForAppointmentDetailModel | null;
};

function PatientInfoForAppointment({ patient }: Props) {
  return (
    <div>
      <h5 className="text-lg font-semibold">Datos paciente:</h5>

      <TextItem>
        <TextItem.Label>Nombre:</TextItem.Label>
        <TextItem.Value capitalize>
          {patient?.names}
          {" "}
          {patient?.last_names}
        </TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Rut:</TextItem.Label>
        <TextItem.Value capitalize>
          {patient?.rut}
        </TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Teléfono:</TextItem.Label>
        <TextItem.Value capitalize>
          {patient?.phone}
        </TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Correo:</TextItem.Label>
        <TextItem.Value capitalize>
          {patient?.email}
        </TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Dirección:</TextItem.Label>
        <TextItem.Value capitalize>
          {patient?.address}
        </TextItem.Value>
      </TextItem>
    </div>
  );
}

export { PatientInfoForAppointment };
