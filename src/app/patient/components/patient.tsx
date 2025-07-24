import type { PropsWithChildren } from "react";

import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import { PatientForm } from "./patient-form";

type Props = PropsWithChildren;

function Patient({ children }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center h-full gap-x-4 lg:gap-x-8"
    >
      {children}
      <div className="max-w-lg w-full lg:border-l md:pl-4 lg:pl-8">
        <PatientForm>
          <Button variant="secondary" onClick={handleBack}>
            Volver
          </Button>
          <Button type="submit">
            Guardar
          </Button>
        </PatientForm>
      </div>
    </div>
  );
}

function PatientData({
  uid,
  fullname,
  children,
}:
PropsWithChildren<{ uid: string; fullname: string }>) {
  return (
    <div className="flex flex-col items-center">
      {children}
      <h5
        className="text-2xl font-semibold capitalize text-center max-w-72 md:max-w-96 xl:max-w-full mt-4 md:mt-8"
      >
        {fullname}
        .
      </h5>
      <div className="flex items-center gap-1">
        <span
          className="max-w-48 truncate block text-muted-foreground"
          title={`id usuario: ${uid}`}
        >
          {uid}
        </span>
        <DefaultTooltip content="Copiar ID de usuario">
          <CopyButton value={uid} />
        </DefaultTooltip>
      </div>
    </div>
  );
}

function PatientImage({ showCaption }: { showCaption?: boolean }) {
  return (
    <div>
      <Avatar className="size-52 lg:size-72">
        <Avatar.Image
          src=""
          alt="Patient Avatar"
        />
        <Avatar.Fallback>
          <UserIcon size={80} className="text-muted-foreground" />
        </Avatar.Fallback>
        <Avatar.ChooseImage />
      </Avatar>
      {showCaption
        && (
          <span className="italic text-muted-foreground text-center block mt-8">
            Seleccionar foto de perfil.
          </span>
        )}
    </div>
  );
}

Patient.Data = PatientData;
Patient.Image = PatientImage;

export { Patient };
