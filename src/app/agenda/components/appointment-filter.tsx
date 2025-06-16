import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/day-picker";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { WeekPicker } from "@/components/ui/week-picker";
import { dateHelper } from "@/lib/date-helper";

import { useFilterAppointmentController } from "../hooks/use-filter-appointment-controller";

function AppointmentFilter() {
  const {
    filters,
    viewMode,
    searchValue,
    professionOptions,
    filteredProfessional,
    onFilter,
    handelSearch,
    handleSelectToday,
    handleClearSearch,
    handleSearchChange,
    handleViewModeChange,
  } = useFilterAppointmentController();

  return (
    <>
      <Search
        value={searchValue}
        label="Rut paciente"
        onSearch={handelSearch}
        onChange={handleSearchChange}
        onClearValue={handleClearSearch}
      />

      <FieldWrapper label="Profesión">
        <SelectNative
          className="w-52"
          options={professionOptions}
          value={filters.profession_id}
          onChange={e => onFilter({ profession_id: +e.target.value, professional_id: null })}
        />
      </FieldWrapper>

      <FieldWrapper label="Profesional">
        <SelectNative
          className="w-52"
          options={filteredProfessional}
          value={filters.professional_id}
          onChange={e => onFilter({ professional_id: +e.target.value })}
        />
      </FieldWrapper>

      <Show when={viewMode === "week"}>
        <WeekPicker
          label="Semana"
          value={{
            from: filters.date_from,
            to: filters.date_to,
          }}
          onValueChange={v => onFilter({
            date_from: v?.from,
            date_to: v?.to,
          })}
        />
      </Show>

      <Show when={viewMode === "day"}>
        <DatePicker
          label="Fecha"
          value={filters.date}
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
    </>
  );
}

export { AppointmentFilter };
