import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { usePatientFilterController } from "../hooks/use-patient-filter-controller";
import { PatientStatus } from "../models";

const INPUT_STYLES = "w-full border-transparent bg-transparent shadow-none focus-visible:ring-transparent focus-visible:border-transparent h-full pe-7 text-muted-foreground placeholder:text-muted-foreground font-normal placeholder:font-normal";

function PatientTableHeader() {
  const {
    filters,
    emailRef,
    nameRef,
    rutRef,
    onFilter,
    handelSearch,
    handleClearSearch,
  } = usePatientFilterController();

  return (
    <Table.Header>
      <Table.Row className="!hover:bg-transparent bg-muted">
        <Table.Head>Nombre</Table.Head>
        <Table.Head>Rut</Table.Head>
        <Table.Head>Correo</Table.Head>
        <Table.Head>Dirección</Table.Head>
        <Table.Head align="center">Estado</Table.Head>
        <Table.Head></Table.Head>
      </Table.Row>

      <Table.Row
        className="!hover:bg-transparent bg- font-bold *:h-full *:border-r *:last-of-type:border-r-0"
      >
        <Table.Head className="p-0">
          <Search
            ref={nameRef}
            searchIconSize={16}
            placeholder="Buscar por nombre..."
            classNames={{ input: INPUT_STYLES }}
            defaultValue={filters.name ?? ""}
            onSearch={v => handelSearch(v, "name")}
            onClearValue={() => handleClearSearch("name")}
          />
        </Table.Head>
        <Table.Head className="p-0">
          <Search
            ref={rutRef}
            searchIconSize={16}
            placeholder="Buscar por rut..."
            classNames={{ input: INPUT_STYLES, root: "w-36" }}
            defaultValue={filters.rut ?? ""}
            onSearch={v => handelSearch(v, "rut")}
            onClearValue={() => handleClearSearch("rut")}
          />
        </Table.Head>
        <Table.Head className="p-0">
          <Search
            ref={emailRef}
            searchIconSize={16}
            placeholder="Buscar por correo..."
            classNames={{ input: INPUT_STYLES }}
            defaultValue={filters.email ?? ""}
            onSearch={v => handelSearch(v, "email")}
            onClearValue={() => handleClearSearch("email")}
          />
        </Table.Head>
        <Table.Head></Table.Head>
        <Table.Head className="p-0">
          <SelectNative
            className={cn(INPUT_STYLES, "max-w-max")}
            options={[
              { value: PatientStatus.ACTIVE, label: "Activo" },
              { value: PatientStatus.INACTIVE, label: "Inactivo" },
            ]}
            value={filters.status ?? ""}
            onChange={e => onFilter({ status: e.target.value })}
          />
        </Table.Head>
        <Table.Head></Table.Head>
      </Table.Row>
    </Table.Header>
  );
}

export { PatientTableHeader };
