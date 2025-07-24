import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { usePatientFilterController } from "../hooks/use-patient-filter-controller";
import { PatientStatus } from "../models";

const INPUT_STYLES = "w-full border-transparent bg-transparent shadow-none focus-visible:ring-transparent focus-visible:border-transparent pe-7 text-muted-foreground placeholder:text-muted-foreground";

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
      <Table.Row className="!hover:bg-transparent bg-muted font-bold *:h-full">
        <Table.Head className="p-0">
          <Search
            ref={nameRef}
            placeholder="Nombre"
            searchIconSize={16}
            classNames={{ input: INPUT_STYLES }}
            defaultValue={filters.name ?? ""}
            onSearch={v => handelSearch(v, "name")}
            onClearValue={() => handleClearSearch("name")}
          />
        </Table.Head>
        <Table.Head className="p-0">
          <Search
            ref={rutRef}
            placeholder="Rut"
            searchIconSize={16}
            classNames={{ input: INPUT_STYLES, root: "w-36" }}
            defaultValue={filters.rut ?? ""}
            onSearch={v => handelSearch(v, "rut")}
            onClearValue={() => handleClearSearch("rut")}
          />
        </Table.Head>
        <Table.Head className="p-0">
          <Search
            ref={emailRef}
            placeholder="Correo"
            searchIconSize={16}
            classNames={{ input: INPUT_STYLES }}
            defaultValue={filters.email ?? ""}
            onSearch={v => handelSearch(v, "email")}
            onClearValue={() => handleClearSearch("email")}
          />
        </Table.Head>
        <Table.Head>Dirección</Table.Head>
        <Table.Head>
          <SelectNative
            withEmptyOption={false}
            className={cn(INPUT_STYLES, "w-24")}
            options={[
              { value: "", label: "Estado" },
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
