import { Patient } from "./patient";

function CreatePatientPresenter() {
  return (
    <>
      <Patient>
        <Patient.Image showCaption />
      </Patient>
    </>
  );
}

export { CreatePatientPresenter };
