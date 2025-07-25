import { PatientMutations } from "../actions/patient-mutations";
import { Patient } from "./patient";

function CreatePatientPresenter() {
  return (
    <>
      <Patient upsertAction={PatientMutations.createPatient}>
        <Patient.Image showCaption />
      </Patient>
    </>
  );
}

export { CreatePatientPresenter };
