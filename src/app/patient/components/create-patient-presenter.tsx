import { PatientActions } from "../actions/patient-actions";
import { Patient } from "./patient";

function CreatePatientPresenter() {
  return (
    <>
      <Patient upsertService={PatientActions.createPatient}>
        <Patient.Image showCaption />
      </Patient>
    </>
  );
}

export { CreatePatientPresenter };
