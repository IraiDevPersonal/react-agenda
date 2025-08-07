import { Professional } from "./professional";

function CreateProfessionalView() {
  return (
    <>
      <Professional>
        <Professional.Image showCaption={true} />
      </Professional>
    </>
  );
}

export { CreateProfessionalView };
