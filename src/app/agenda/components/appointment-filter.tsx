

import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { DateWeekSelector } from "@/components/ui/date-week-selector";
import { DatePicker } from "@/components/ui/day-picker";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { dateHelper } from "@/lib/date-helper";

import type { AppointmentViewMode } from "../types";

import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { useAppointmentUiStore } from "../stores/appointment-ui-store";

function AppointmentFilter() {
  const viewMode = useAppointmentUiStore(s => s.viewMode);
  const onViewModeChange = useAppointmentUiStore(s => s.onViewModeChange);

  const { filters, onFilter } = useAppointmentFilters();

  const handleSelectCurrentWeek = () => {
    const newDate = dateHelper.getWeekRange(new Date())
    onFilter({
      date: newDate.from,
      date_to: newDate.to
    });
  };

  return (
    <>
      <FieldWrapper>
        <Label>Profesión</Label>
        <SelectNative
          className="w-52"
          value={filters.profession_id}
          onChange={e => onFilter({ profession_id: +e.target.value })}
          options={[
            { label: "Profesión 1", value: "1" },
            { label: "Profesión 2", value: "2" },
          ]}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Profesional</Label>
        <SelectNative
          className="w-52"
          value={filters.professional_id}
          onChange={e => onFilter({ professional_id: +e.target.value })}
          options={[
            { label: "Profesional 1", value: "1" },
            { label: "Profesional 2", value: "2" },
          ]}
        />
      </FieldWrapper>

      <Show when={viewMode === "week"}>
        <DateWeekSelector
          label="Semana"
          value={{
            from: filters.date_from!,
            to: filters.date_to!
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
          onValueChange={v => onFilter({ date: v, date_from: null, date_to: null })}
        />
      </Show>

      <Button variant="outline" onClick={handleSelectCurrentWeek}>
        Hoy
      </Button>

      <SelectNative
        value={viewMode}
        withEmptyOption={false}
        onChange={e => {
          const value = e.target.value as AppointmentViewMode
          if (value === "day") {
            onFilter({ date_from: null, date_to: null })
          }
          if (value === "week") {
            const date = dateHelper.getWeekRange(filters.date ?? new Date())
            onFilter({ date_from: date.from, date_to: date.to, date: null })
          }
          onViewModeChange(value)
        }}
        options={[
          { label: "Día", value: "day" },
          { label: "Semana", value: "week" },
        ]}
      />
    </>
  );
}

export { AppointmentFilter };

