import { FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";

function InlinePatientFilters() {
  return (
    <>
      <Search
        // ref={searchRef}
        label="Rut"
        // onSearch={handelSearch}
        className="w-[8.5rem]"
        // key={filters.patient_rut}
        // onClearValue={handleClearSearch}
        // defaultValue={filters.patient_rut ?? ""}
      />

      <Search
        // ref={searchRef}
        label="Nombre"
        // onSearch={handelSearch}
        // key={filters.patient_rut}
        // onClearValue={handleClearSearch}
        // defaultValue={filters.patient_rut ?? ""}
      />

      <Search
        // ref={searchRef}
        label="Correo"
        // onSearch={handelSearch}
        // key={filters.patient_rut}
        // onClearValue={handleClearSearch}
        // defaultValue={filters.patient_rut ?? ""}
      />

      <FieldWrapper label="Estado">
        <SelectNative
          className="w-32"
          // options={professionOptions}
          // value={filters.profession_id ?? ""}
          // onChange={e => onFilter({ profession_id: +e.target.value, professional_id: null })}
        />
      </FieldWrapper>

      <DefaultTooltip content="Refrescar datos">
        <Button variant="outline" size="icon">
          <RotateCcwIcon size={20} />
        </Button>
      </DefaultTooltip>

      <DefaultTooltip content="Limpiar todos los filtros">
        <Button variant="outline">
          <span>Limpiar</span>
          <FunnelXIcon size={20} />
        </Button>
      </DefaultTooltip>
    </>
  );
}

export { InlinePatientFilters };
