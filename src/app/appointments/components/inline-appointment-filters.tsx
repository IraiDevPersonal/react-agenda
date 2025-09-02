import { FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { SearchPatient } from "@/app/patients/components/search-patient";
import { Button } from "@/components/ui/button";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { stringToNullableNumber } from "@/lib/utils";

import { useAppointmentFilterOptions } from "../hooks/use-appointment-filter-options";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { AppointmentDateSelector } from "./appointment-date-selector";
import { AppointmentStatusSelector } from "./appointment-status-selector";
import { AppointmentViewModeSelector } from "./appointment-view-mode-selector";

function InlineAppointmentFilters() {
  const {
    filters,
    onFilter,
    handleRefresh,
    handleSelectToday,
    handleClearAllFilters,
  } = useAppointmentFilters();
  const { professionOptions, filteredUserOptions } = useAppointmentFilterOptions();

  return (
    <>
      <SearchPatient
        autoFocus
        label="Rut paciente"
        key={filters.patient_rut}
        defaultValue={filters.patient_rut ?? ""}
        onSearch={v => onFilter({ patient_rut: v })}
      />

      <FieldWrapper label="Profesión">
        <SelectNative
          className="w-52"
          options={professionOptions}
          value={filters.profession_id ?? ""}
          onChange={e => onFilter({
            profession_id: stringToNullableNumber(e.target.value),
            user_id: null,
          })}
        />
      </FieldWrapper>

      <FieldWrapper label="Usuario">
        <SelectNative
          className="w-52"
          options={filteredUserOptions}
          value={filters.user_id ?? ""}
          onChange={e => onFilter({
            user_id: stringToNullableNumber(e.target.value),
          })}
        />
      </FieldWrapper>

      <AppointmentStatusSelector />

      <AppointmentDateSelector />

      <Button variant="outline" onClick={() => handleSelectToday()}>
        Hoy
      </Button>

      <AppointmentViewModeSelector />

      <DefaultTooltip content="Refrescar datos">
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RotateCcwIcon size={20} />
        </Button>
      </DefaultTooltip>

      <DefaultTooltip content="Limpiar todos los filtros">
        <Button variant="outline" onClick={handleClearAllFilters}>
          <span>Limpiar</span>
          <FunnelXIcon size={20} />
        </Button>
      </DefaultTooltip>
    </>
  );
}

export { InlineAppointmentFilters };