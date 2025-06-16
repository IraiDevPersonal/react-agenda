import { FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/day-picker";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { WeekPicker } from "@/components/ui/week-picker";
import { dateHelper } from "@/lib/date-helper";

import { useAppointmentFilterController } from "../hooks/use-appointment-filter-controller";

function InlineAppointmentFilters() {
  const {
    filters,
    viewMode,
    searchRef,
    professionOptions,
    filteredProfessional,
    onFilter,
    handelSearch,
    handleSelectToday,
    handleClearSearch,
    handleViewModeChange,
    handleClearAllFilters,
    handleRefreshAppointments,
  } = useAppointmentFilterController();

  return (
    <>
      <Search
        ref={searchRef}
        label="Rut paciente"
        onSearch={handelSearch}
        key={filters.patient_rut}
        onClearValue={handleClearSearch}
        defaultValue={filters.patient_rut ?? ""}
      />

      <FieldWrapper label="Profesión">
        <SelectNative
          className="w-52"
          options={professionOptions}
          value={filters.profession_id ?? ""}
          onChange={e => onFilter({ profession_id: +e.target.value, professional_id: null })}
        />
      </FieldWrapper>

      <FieldWrapper label="Profesional">
        <SelectNative
          className="w-52"
          options={filteredProfessional}
          value={filters.professional_id ?? ""}
          onChange={e => onFilter({ professional_id: +e.target.value })}
        />
      </FieldWrapper>

      <Show when={viewMode === "week"}>
        <WeekPicker
          label="Semana"
          value={filters.date_from && filters.date_to
            ? {
                from: filters.date_from,
                to: filters.date_to,
              }
            : undefined}
          onValueChange={v => onFilter({
            date_from: v?.from,
            date_to: v?.to,
          })}
        />
      </Show>

      <Show when={viewMode === "day"}>
        <DatePicker
          label="Fecha"
          value={filters.date ?? undefined}
          onValueChange={v => onFilter({ date: dateHelper.normalizeDate(v) })}
        />
      </Show>

      <Button variant="outline" onClick={() => handleSelectToday(viewMode)}>
        Hoy
      </Button>

      <SelectNative
        value={viewMode}
        withEmptyOption={false}
        onChange={handleViewModeChange}
        options={[
          { label: "Día", value: "day" },
          { label: "Semana", value: "week" },
        ]}
      />

      <DefaultTooltip content="Refrescar datos">
        <Button variant="outline" size="icon" onClick={handleRefreshAppointments}>
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
