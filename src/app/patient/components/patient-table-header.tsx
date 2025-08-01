import { Loader2Icon } from "lucide-react";

import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { usePatientFilterController } from "../hooks/use-patient-filter-controller";
import { useQueryPatients } from "../hooks/use-query-patients";
import { PatientStatus } from "../models";
import { PatientQuery } from "../queries/patient-queries";
import { SearchPatient } from "./search-patient";

function PatientTableHeader() {
  const {
    handelSearch,
    filters,
    rutRef,
    onFilter,
  } = usePatientFilterController();
  const { isFetching } = useQueryPatients({
    patientQueryOptions: PatientQuery.getPatientLoaderState,
  });

  return (
    <Table.Header>
      <Table.HeaderRow>
        <Table.Head className="w-[286px]">Nombre</Table.Head>
        <Table.Head className="w-[147px]">Rut</Table.Head>
        <Table.Head className="w-[229px]">Correo</Table.Head>
        <Table.Head className="w-[206px]">Dirección</Table.Head>
        <Table.Head className="w-[136px]">Estado</Table.Head>
        <Table.Head className="w-[98px]">
          {isFetching && <Loader2Icon size={20} className="animate-spin" />}
        </Table.Head>
      </Table.HeaderRow>

      <Table.HeaderFilterRow>
        <Table.Head>
          <SearchPatient
            autoFocus
            classNames={{ input: "table-filter-field" }}
            onSearch={v => handelSearch(v, "name")}
            placeholder="Buscar por nombre..."
            defaultValue={filters.name ?? ""}
            searchIconSize={16}
            key={filters.name}
          />
        </Table.Head>
        <Table.Head>
          <Search
            classNames={{ input: "table-filter-field", root: "w-36" }}
            onSearch={v => handelSearch(v, "rut")}
            defaultValue={filters.rut ?? ""}
            placeholder="Buscar por rut..."
            searchIconSize={16}
            key={filters.rut}
            ref={rutRef}
          />
        </Table.Head>
        <Table.Head>
          <Search
            classNames={{ input: "table-filter-field" }}
            onSearch={v => handelSearch(v, "email")}
            placeholder="Buscar por correo..."
            defaultValue={filters.email ?? ""}
            searchIconSize={16}
            key={filters.email}
          />
        </Table.Head>
        <Table.Head></Table.Head>
        <Table.Head>
          <SelectNative
            options={[
              { value: PatientStatus.ACTIVE, label: "Habilitados" },
              { value: PatientStatus.INACTIVE, label: "Deshabilitados" },
            ]}
            onChange={e => onFilter({ status: e.target.value })}
            className={cn("table-filter-field", "max-w-max")}
            value={filters.status ?? ""}
          />
        </Table.Head>
        <Table.Head></Table.Head>
      </Table.HeaderFilterRow>
    </Table.Header>
  );
}

export { PatientTableHeader };
