import { User } from "./user";

function CreateUserView() {
  return (
    <User>
      <User.Image showCaption={true} />
    </User>
  );
}

export { CreateUserView };
