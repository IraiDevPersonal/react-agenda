import { useQuery } from "@tanstack/react-query";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";

import { Avatar } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
} from "@/components/ui/table";

import { PatientQueryOptions } from "../queries/patient-queries";

function PatientTable() {
  const { data, isError, error } = useQuery(PatientQueryOptions.getAll());

  if (isError) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row className="hover:bg-transparent font-bold">
            <Table.Head>Nombre</Table.Head>
            <Table.Head>Rut</Table.Head>
            <Table.Head>Correo</Table.Head>
            <Table.Head>Teléfono</Table.Head>
            <Table.Head>Dirección</Table.Head>
            <Table.Head>Estado</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(data ?? []).map(item => (
            <Table.Row key={item.uid}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 ">
                    <Avatar.Image src="" alt="user" />
                    <Avatar.Fallback className="bg-neutral-300 text-primary uppercase">
                      {item.names.charAt(0)}
                      {item.last_names.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                  <div>
                    <span className="font-medium block capitalize">
                      {item.names}
                      {" "}
                      {item.last_names}
                    </span>
                    <small className="text-muted-foreground mt-0.5 text-xs">
                      {item.last_names}
                    </small>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{item.rut}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.phone}</Table.Cell>
              <Table.Cell>{item.address}</Table.Cell>
              <Table.Cell>estado</Table.Cell>
              <Table.Cell>
                <div className="flex items-center justify-end">
                  <Link
                    to={{ pathname: item.uid }}
                    className={buttonVariants({ variant: "ghost", size: "icon" })}
                  >
                    <PencilIcon />
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Trash2Icon />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export { PatientTable };
