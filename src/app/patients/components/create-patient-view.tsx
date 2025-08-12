import { patientService } from "../container";
import { Patient } from "./patient";

function CreatePatientView() {
  return (
    <>
      <Patient upsertService={patientService.createPatient}>
        <Patient.Image showCaption />
      </Patient>
    </>
  );
}

export { CreatePatientView };
