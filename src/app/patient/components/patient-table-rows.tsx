import { PencilIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router";

import { For } from "@/components/for";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Table } from "@/components/ui/table";

import { useQueryPatients } from "../hooks/use-query-patients";
import { PatientQuery } from "../queries/patient-queries";
import { TogglePatientStatusButton } from "./toggle-patient-status-button";

function PatientTableRows() {
  const {
    isFetching,
    data,
  } = useQueryPatients({
    patientQueryOptions: PatientQuery.getAll,
  });

  return (
    <For
      items={(data?.data ?? [])}
      fallback={(
        <Table.Row>
          <Table.Cell colSpan={6} align="center" className="italic text-muted-foreground">
            No hay pacientes...
          </Table.Cell>
        </Table.Row>
      )}
    >
      {patient => (
        <Table.Row key={patient.uid}>
          <Table.Cell>
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <Avatar.Image
                  src={patient.avatar_image ?? ""}
                  alt={`user-${patient.names}-${patient.last_names}`}
                />
                <Avatar.Fallback className="bg-neutral-300 text-primary uppercase">
                  {patient.names.charAt(0)}
                  {patient.last_names.charAt(0)}
                </Avatar.Fallback>
              </Avatar>
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
          <Table.Cell>
            <div>
              <span className="block font-semibold">{patient.email}</span>
              <div
                className="mt-1 text-muted-foreground text-xs flex items-baseline-last gap-x-1"
              >
                <PhoneIcon size={12} />
                <span>{patient.phone}</span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>{patient.address}</Table.Cell>
          <Table.Cell align="center">
            <Badge variant={patient.is_deleted ? "cancelled" : "confirmed"}>
              {patient.is_deleted ? "Deshabilitado" : "Habilitado"}
            </Badge>
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
