import { Avatar } from "@/components/ui/avatar";

import type { PatientModel } from "../../patients/models/patient-model";

type Props = {
  avatarUrl: PatientModel["avatar_image"];
  names: PatientModel["names"];
  lastNames: PatientModel["last_names"];
};

function UserAvatar({ avatarUrl, lastNames, names }: Props) {
  return (
    <>
      <Avatar className="size-9">
        <Avatar.Image
          src={avatarUrl ?? ""}
          alt={`user-${names}-${lastNames}`}
        />
        <Avatar.Fallback className="bg-neutral-300 text-primary uppercase">
          {names.charAt(0)}
          {lastNames.charAt(0)}
        </Avatar.Fallback>
      </Avatar>
    </>
  );
}

export { UserAvatar };
