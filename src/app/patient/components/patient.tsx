import type { PropsWithChildren } from "react";

import { UserIcon } from "lucide-react";
import { createContext, use, useMemo } from "react";

import { Avatar } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { CustomError } from "@/lib/custom-error";

import type { PatientModel, UpsertActionState } from "../models/patient-model";

import { PatientForm } from "./patient-form";

type Props = PropsWithChildren<{
  upsertAction: (prevState: UpsertActionState, formData: FormData) => Promise<UpsertActionState>;
  patient?: PatientModel | undefined;
}>;

const Context = createContext<Pick<Props, "patient">>({
  patient: undefined,
});

function usePatientContext() {
  const context = use(Context);

  if (!context) {
    throw new CustomError("el usePatientContext solo puede ser usado dentro de su Provider");
  }

  return context;
}

function Patient({ children, patient, upsertAction }: Props) {
  const value = useMemo(() => ({ patient }), [patient]);

  return (
    <Context value={value}>
      <div
        className="flex flex-col lg:flex-row items-center justify-center h-full gap-x-4 lg:gap-x-8"
      >
        {children}
        <div className="max-w-lg w-full lg:border-l md:pl-4 lg:pl-8">
          <PatientForm upsertAction={upsertAction} patient={patient} />
        </div>
      </div>
    </Context>
  );
}

function PatientData({ children }: PropsWithChildren) {
  const { patient } = usePatientContext();
  return (
    <div className="flex flex-col items-center">
      {children}
      <h5
        className="text-2xl font-semibold capitalize text-center max-w-72 md:max-w-96 xl:max-w-full mt-4 md:mt-8"
      >
        {patient?.names}
        {" "}
        {patient?.last_names}
        .
      </h5>
      <div className="flex items-center gap-1">
        <span
          className="max-w-48 truncate block text-muted-foreground"
          title={`id usuario: ${patient?.uid}`}
        >
          {patient?.uid}
        </span>
        <DefaultTooltip content="Copiar ID de usuario">
          <CopyButton value={patient?.uid ?? ""} />
        </DefaultTooltip>
      </div>
    </div>
  );
}

function PatientImage({ showCaption }: { showCaption?: boolean }) {
  const { patient } = usePatientContext();
  return (
    <div>
      <Avatar className="size-52 lg:size-72">
        <Avatar.Image
          src={patient?.avatar_image ?? ""}
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
