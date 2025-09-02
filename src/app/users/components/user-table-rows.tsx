import { useQuery } from "@tanstack/react-query";
import { PencilIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router";

import { UserAvatar } from "@/app/profile/components/user-avatar";
import { UserStatusBadge } from "@/app/profile/components/user-status-badge";
import { For } from "@/components/for";
import { buttonVariants } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { cn, formatPhoneNumber } from "@/lib/utils";

import { userQuery } from "../container";
import { useUserFilters } from "../hooks/use-user-filters";
import { ToggleUserStatusButton } from "./toggle-user-status-button";

function UserTableRows() {
  const { filters } = useUserFilters();
  const {
    isFetching,
    data,
  } = useQuery(userQuery.list(filters));

  return (
    <For
      items={(data?.data ?? [])}
      fallback={(
        <Table.Row>
          <Table.Cell
            colSpan={6}
            align="center"
            className={cn("italic text-muted-foreground", isFetching && "animate-pulse")}
          >
            {isFetching ? "Cargando users..." : "No hay users"}
          </Table.Cell>
        </Table.Row>
      )}
    >
      {user => (
        <Table.Row key={user.uid}>
          <Table.Cell>
            <div className="flex items-center gap-3">
              <UserAvatar
                avatarUrl={user.avatar_image}
                lastNames={user.last_names}
                names={user.names}
              />
              <div>
                <span className="font-medium block capitalize">
                  {user.names}
                  {" "}
                  {user.last_names}
                </span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{user.rut}</Table.Cell>
          <Table.Cell>
            <div>
              <span className="block font-semibold">{user.email}</span>
              <div
                className="mt-1 text-muted-foreground text-xs flex items-baseline-last gap-x-1"
              >
                <PhoneIcon size={12} />
                <span>{formatPhoneNumber(user.phone)}</span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{user.address}</Table.Cell>
          {/* <Table.Cell>
            {user.professions?.map(p => p.name).join(", ")}
          </Table.Cell> */}
          <Table.Cell align="center">
            <UserStatusBadge isDeleted={false} />
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center justify-end">
              <Link
                to={{ pathname: user.uid }}
                data-disabled={isFetching}
                className={buttonVariants({
                  className: isFetching
                    ? "data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none"
                    : "",
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <PencilIcon />
              </Link>
              <ToggleUserStatusButton user={user} />
            </div>
          </Table.Cell>
        </Table.Row>
      )}
    </For>
  );
}

export { UserTableRows };
