import { PatientServices } from "../services/patient-services";
import { Patient } from "./patient";

function CreatePatientPresenter() {
  return (
    <>
      <Patient upsertService={PatientServices.create}>
        <Patient.Image showCaption />
      </Patient>
    </>
  );
}

export { CreatePatientPresenter };
