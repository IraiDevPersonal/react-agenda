import { useQuery } from "@tanstack/react-query";
import { PencilIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router";

import { UserAvatar } from "@/app/profile/components/user-avatar";
import { UserStatusBadge } from "@/app/profile/components/user-status-badge";
import { For } from "@/components/for";
import { buttonVariants } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { cn, formatPhoneNumber } from "@/lib/utils";

import { useProfessionalFilters } from "../hooks/use-professional-filters";
import { professionalQuery } from "../container";
import { ToggleProfessionalStatusButton } from "./toggle-patient-status-button";

function ProfessionalTableRows() {
  const { filters } = useProfessionalFilters();
  const {
    isFetching,
    data,
  } = useQuery(professionalQuery.list(filters));

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
            {isFetching ? "Cargando professionales..." : "No hay professionales"}
          </Table.Cell>
        </Table.Row>
      )}
    >
      {professional => (
        <Table.Row key={professional.uid}>
          <Table.Cell>
            <div className="flex items-center gap-3">
              <UserAvatar
                avatarUrl={professional.avatar_image}
                lastNames={professional.last_names}
                names={professional.names}
              />
              <div>
                <span className="font-medium block capitalize">
                  {professional.names}
                  {" "}
                  {professional.last_names}
                </span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{professional.rut}</Table.Cell>
          <Table.Cell>
            <div>
              <span className="block font-semibold">{professional.email}</span>
              <div
                className="mt-1 text-muted-foreground text-xs flex items-baseline-last gap-x-1"
              >
                <PhoneIcon size={12} />
                <span>{formatPhoneNumber(professional.phone)}</span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{professional.address}</Table.Cell>
          <Table.Cell>
            {professional.professions.map(p => p.name).join(", ")}
          </Table.Cell>
          <Table.Cell align="center">
            <UserStatusBadge isDeleted={false} />
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center justify-end">
              <Link
                to={{ pathname: professional.uid }}
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
              <ToggleProfessionalStatusButton professional={professional} />
            </div>
          </Table.Cell>
        </Table.Row>
      )}
    </For>
  );
}

export { ProfessionalTableRows };
