import type { PropsWithChildren } from "react";

import { Loader2Icon, UserIcon } from "lucide-react";
import { useMemo } from "react";

import { UserStatusBadge } from "@/app/user/components/user-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import type { ProfessionalModel } from "../models/professional-model";

import { ProfessionalCompoundContext, useProfessionalCompoundContext } from "../context/professional-compound-context";
import { ProfessionalForm } from "./professional-form";
import { ProfessionalProfessionsControl } from "./professional-professions-control";
import { ProfessionalRolesControl } from "./professional-roles-control";

type Props = PropsWithChildren<{
  // upsertService: UpsertProfessionalServiceFn;
  professional?: ProfessionalModel | undefined;
}>;

function Professional({ children, professional }: Props) {
  const value = useMemo(() => ({ professional }), [professional]);

  return (
    <ProfessionalCompoundContext value={value}>
      <Professional.Wrapper>
        {children}
        <Professional.FormWrapper>
          <ProfessionalForm
          // upsertService={upsertService}
            professional={professional}
          >
            <ProfessionalRolesControl />
            <ProfessionalProfessionsControl />
          </ProfessionalForm>
        </Professional.FormWrapper>
      </Professional.Wrapper>
    </ProfessionalCompoundContext>
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

function ProfessionalData({ children }: PropsWithChildren) {
  const { professional } = useProfessionalCompoundContext();
  return (
    <Professional.DataWrapper>
      {children}
      <h5
        className="text-2xl font-semibold capitalize text-center max-w-52 md:max-w-96 xl:max-w-full mt-4 md:mt-8"
      >
        {professional?.names}
        {" "}
        {professional?.last_names}
        .
      </h5>
      <div className="flex items-center gap-1">
        <span
          className="max-w-48 truncate block text-muted-foreground"
          title="id usuario:"
        >
          {professional?.uid}
        </span>
        <DefaultTooltip content="Copiar ID de usuario">
          <CopyButton value={professional?.uid ?? ""} />
        </DefaultTooltip>
      </div>
      <UserStatusBadge isDeleted={false} />
    </Professional.DataWrapper>
  );
}

function ProfessionalImage({ showCaption }: { showCaption?: boolean }) {
  const { professional } = useProfessionalCompoundContext();
  const isPending = false;
  // const isPending = Boolean(useIsMutating({
  //   ...ProfessionalQuery.upsert(),
  // }));

  return (
    <div>
      <Avatar className="size-52 lg:size-72">
        <Avatar.Image
          src={professional?.avatar_image ?? ""}
          alt="Professional Avatar"
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

Professional.Data = ProfessionalData;
Professional.Image = ProfessionalImage;
Professional.Wrapper = ProfessionalWrapper;
Professional.DataWrapper = ProfessionalDataWrapper;
Professional.FormWrapper = ProfessionalFormWrapper;

export { Professional };
