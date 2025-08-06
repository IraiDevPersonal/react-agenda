import { PatientServices } from "../services/patient-services";
import { Patient } from "./patient";

function CreatePatientView() {
  return (
    <>
      <Patient upsertService={PatientServices.create}>
        <Patient.Image showCaption />
      </Patient>
    </>
  );
}

export { CreatePatientView };
