import type { PropsWithChildren } from "react";

import { Loader2Icon, UserIcon } from "lucide-react";
import { useMemo } from "react";

import { UserStatusBadge } from "@/app/profile/components/user-status-badge";
import { Avatar } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import { DefaultTooltip } from "@/components/ui/tooltip";

import type { UserModel } from "../models/user-model";

import { UserContext, useUserContext } from "../context/user-context";
import { UserForm } from "./user-form";
import { UserProfessionsControl } from "./user-professions-control";
import { UserRolesControl } from "./user-roles-control";

type Props = PropsWithChildren<{
  // upsertService: UpsertUserServiceFn;
  user?: UserModel | undefined;
}>;

function User({ children, user }: Props) {
  const value = useMemo(() => ({ user }), [user]);

  return (
    <UserContext value={value}>
      <User.Wrapper>
        {children}
        <User.FormWrapper>
          <UserForm
          // upsertService={upsertService}
            user={user}
          >
            <UserRolesControl />
            <UserProfessionsControl />
          </UserForm>
        </User.FormWrapper>
      </User.Wrapper>
    </UserContext>
  );
}

function UserWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className="flex flex-col xl:flex-row items-center justify-center h-full gap-x-4 lg:gap-x-8"
    >
      {children}
    </div>
  );
}

function UserDataWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center mb-8 xl:mb-0">
      {children}
    </div>
  );
}

function UserFormWrapper({ children }: PropsWithChildren) {
  return (
    <div className="max-w-lg min-w-lg xl:border-l md:pl-4 lg:pl-8">
      {children}
    </div>
  );
}

function UserData({ children }: PropsWithChildren) {
  const { user } = useUserContext();
  return (
    <User.DataWrapper>
      {children}
      <h5
        className="text-2xl font-semibold capitalize text-center max-w-52 md:max-w-96 xl:max-w-full mt-4 md:mt-8"
      >
        {user?.names}
        {" "}
        {user?.last_names}
        .
      </h5>
      <div className="flex items-center gap-1">
        <span
          className="max-w-48 truncate block text-muted-foreground"
          title="id usuario:"
        >
          {user?.uid}
        </span>
        <DefaultTooltip content="Copiar ID de usuario">
          <CopyButton value={user?.uid ?? ""} />
        </DefaultTooltip>
      </div>
      <UserStatusBadge isDeleted={false} />
    </User.DataWrapper>
  );
}

function UserImage({ showCaption }: { showCaption?: boolean }) {
  const { user } = useUserContext();
  const isPending = false;
  // const isPending = Boolean(useIsMutating({
  //   ...UserQuery.upsert(),
  // }));

  return (
    <div>
      <Avatar className="size-52 lg:size-72">
        <Avatar.Image
          src={user?.avatar_image ?? ""}
          alt="User Avatar"
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

User.Data = UserData;
User.Image = UserImage;
User.Wrapper = UserWrapper;
User.DataWrapper = UserDataWrapper;
User.FormWrapper = UserFormWrapper;

export { User };
