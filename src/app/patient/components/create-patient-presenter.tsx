import { PatientServices } from "../services/patient-services";
import { Patient } from "./patient";

function CreatePatientPresenter() {
  return (
    <>
      <Patient upsertService={PatientServices.createPatient}>
        <Patient.Image showCaption />
      </Patient>
    </>
  );
}

export { CreatePatientPresenter };
