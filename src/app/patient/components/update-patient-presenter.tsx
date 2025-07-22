import { Patient } from "./patient";

function UpdatePatientPresenter() {
  return (
    <>
      <Patient>
        <Patient.Data
          fullname="Ignacio rodrigo arriagada iriarte"
          uid="asdnjnasd-kjansdjna-kjnasd12uha"
        >
          <Patient.Image />
        </Patient.Data>
      </Patient>
    </>
  );
}

export { UpdatePatientPresenter };
