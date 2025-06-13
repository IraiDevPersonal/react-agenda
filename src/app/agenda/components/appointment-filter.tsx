import { SearchIcon } from "lucide-react";

import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/day-picker";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { FieldWrapperWithAccessory } from "@/components/ui/field-wrapper-with-accessory";
import { Input } from "@/components/ui/input";
import { SelectNative } from "@/components/ui/select-native";
import { WeekPicker } from "@/components/ui/week-picker";
import { dateHelper } from "@/lib/date-helper";

import { useFilterAppointmentController } from "../hooks/use-filter-appointment-controller";

function AppointmentFilter() {
  const {
    filters,
    viewMode,
    professionOptions,
    professionalOptions,
    onFilter,
    handleSelectToday,
    handleViewModeChange,
  } = useFilterAppointmentController();

  return (
    <>
      <FieldWrapperWithAccessory
        label="Rut Paciente"
        endComponent={<SearchIcon size={20} />}
      >
        <Input className="w-52 pe-8" placeholder="Buscar..." />
      </FieldWrapperWithAccessory>

      <FieldWrapper label="Profesión">
        <SelectNative
          className="w-52"
          value={filters.profession_id}
          onChange={e => onFilter({ profession_id: +e.target.value })}
          options={professionOptions}
        />
      </FieldWrapper>

      <FieldWrapper label="Profesional">
        <SelectNative
          className="w-52"
          value={filters.professional_id}
          onChange={e => onFilter({ professional_id: +e.target.value })}
          options={professionalOptions}
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
