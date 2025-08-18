import type { PropsWithChildren } from "react";

import { useIsMutating } from "@tanstack/react-query";
import { Loader2Icon, UserIcon } from "lucide-react";
import { useMemo } from "react";

import { Avatar } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import type { UpsertPatientServiceFn } from "../models/patient-action-model";
import type { PatientModel } from "../models/patient-model";

import { UserStatusBadge } from "../../profile/components/user-status-badge";
import { patientQuery } from "../container";
import { PatientContext, usePatientContext } from "../context/patient-context";
import { PatientForm } from "./patient-form";

type Props = PropsWithChildren<{
  upsertService: UpsertPatientServiceFn;
  patient?: PatientModel | undefined;
}>;

function Patient({ children, patient, upsertService }: Props) {
  const value = useMemo(() => ({ patient }), [patient]);

  return (
    <PatientContext value={value}>
      <Patient.Wrapper>
        {children}
        <Patient.FormWrapper>
          <PatientForm upsertService={upsertService} patient={patient} />
        </Patient.FormWrapper>
      </Patient.Wrapper>
    </PatientContext>
  );
}

function ProfessionalWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className="flex flex-col xl:flex-row items-center justify-center h-full gap-x-4 lg:gap-x-8"
    >
      {children}
    </div>
  );
}

function ProfessionalDataWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center mb-8 xl:mb-0">
      {children}
    </div>
  );
}

function ProfessionalFormWrapper({ children }: PropsWithChildren) {
  return (
    <div className="max-w-lg min-w-lg xl:border-l md:pl-4 lg:pl-8">
      {children}
    </div>
  );
}

function PatientData({ children }: PropsWithChildren) {
  const { patient } = usePatientContext();
  return (
    <Patient.DataWrapper>
      {children}
      <h5
        className="text-2xl font-semibold capitalize text-center max-w-52 md:max-w-96 xl:max-w-full mt-4 md:mt-8"
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
      <UserStatusBadge isDeleted={patient?.is_deleted ?? false} />
    </Patient.DataWrapper>
  );
}

function PatientImage({ showCaption }: { showCaption?: boolean }) {
  const { patient } = usePatientContext();
  // TODO: para identificar cuando estoy realizando una mutacion en otro componente mediante el mutationKey
  const isPending = Boolean(useIsMutating(patientQuery.upsertMutation()));

  return (
    <div>
      <Avatar className="size-52 lg:size-72">
        <Avatar.Image
          src={patient?.avatar_image ?? ""}
          alt="Patient Avatar"
        />
        <Avatar.Fallback className={isPending ? "animate-pulse" : ""}>
          <UserIcon size={80} className="text-muted-foreground" />
        </Avatar.Fallback>
        <Avatar.ChooseImage />
        {isPending && (
          <Loader2Icon
            className="animate-spin text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            strokeWidth={1}
            size={180}
          />
        )}
      </Avatar>
      {showCaption && (
        <span className="italic text-muted-foreground text-center block mt-8">
          {
            isPending
              ? "Cargando foto de perfil..."
              : "Seleccionar foto de perfil."
          }
        </span>
      )}
    </div>
  );
}

Patient.Data = PatientData;
Patient.Image = PatientImage;
Patient.Wrapper = ProfessionalWrapper;
Patient.DataWrapper = ProfessionalDataWrapper;
Patient.FormWrapper = ProfessionalFormWrapper;

export { Patient };
