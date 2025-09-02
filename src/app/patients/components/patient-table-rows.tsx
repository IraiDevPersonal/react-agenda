import { useQuery } from "@tanstack/react-query";
import { PencilIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router";

import { UserStatus } from "@/app/users/models/shared-model";
import { For } from "@/components/for";
import { buttonVariants } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { DateFormat, dateHelper } from "@/lib/date-helper";
import { cn, formatPhoneNumber } from "@/lib/utils";

import { UserAvatar } from "../../profile/components/user-avatar";
import { UserStatusBadge } from "../../profile/components/user-status-badge";
import { patientQuery } from "../container";
import { usePatientFilters } from "../hooks/use-patient-filters";
import { TogglePatientStatusButton } from "./toggle-patient-status-button";

function PatientTableRows() {
  const { filters } = usePatientFilters();
  const {
    data,
    isFetching,
  } = useQuery(patientQuery.list(filters));

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
            {isFetching ? "Cargando pacientes..." : "No hay pacientes"}
          </Table.Cell>
        </Table.Row>
      )}
    >
      {patient => (
        <Table.Row key={patient.uid}>
          <Table.Cell>
            <div className="flex items-center gap-3">
              <UserAvatar
                avatarUrl={patient.avatar_image}
                lastNames={patient.last_names}
                names={patient.names}
              />
              <div>
                <span className="font-medium block capitalize">
                  {patient.names}
                  {" "}
                  {patient.last_names}
                </span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{patient.rut}</Table.Cell>
          <Table.Cell align="center">{dateHelper.format(patient.birth_date, DateFormat["dd-MM-yyyy"])}</Table.Cell>
          <Table.Cell>
            <div>
              <span className="block font-semibold">{patient.email}</span>
              <div
                className="mt-1 text-muted-foreground text-xs flex items-baseline-last gap-x-1"
              >
                <PhoneIcon size={12} />
                <span>{formatPhoneNumber(patient.phone)}</span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{patient.address}</Table.Cell>
          <Table.Cell align="center">
            <UserStatusBadge isDeleted={patient.status !== UserStatus.ACTIVE} />
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center justify-end">
              <Link
                to={{ pathname: patient.uid }}
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
              <TogglePatientStatusButton patient={patient} />
            </div>
          </Table.Cell>
        </Table.Row>
      )}
    </For>
  );
}

export { PatientTableRows };
