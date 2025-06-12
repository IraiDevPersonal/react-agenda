import type { ChangeEvent } from "react";

import { useQuery } from "@tanstack/react-query";

import { getProfessionForFilterQueryOptions } from "@/app/profession/queries/profession.query";
import { getProfessionalForFilterQueryOptions } from "@/app/professional/queries/professional.query";
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

  const { data: professionOptions } = useQuery({
    enabled: true,
    ...getProfessionForFilterQueryOptions(),
  });

  const { data: professionalOptions } = useQuery({
    enabled: true,
    ...getProfessionalForFilterQueryOptions(),
  });

  const handleSelectCurrentWeek = () => {
    const newDate = dateHelper.getWeekRange(new Date());
    onFilter({
      date: newDate.from,
      date_to: newDate.to,
    });
  };

  const handleViewModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as AppointmentViewMode;

    if (value === "day") {
      onFilter({ date_to: null });
    }
    if (value === "week") {
      const newDate = dateHelper.getWeekRange(filters.date ?? new Date());
      onFilter({ date_to: newDate.to, date: newDate.from });
    }

    onViewModeChange(value);
  };

  return (
    <>
      <FieldWrapper>
        <Label>Profesión</Label>
        <SelectNative
          className="w-52"
          value={filters.profession_id}
          onChange={e => onFilter({ profession_id: +e.target.value })}
          options={professionOptions}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Profesional</Label>
        <SelectNative
          className="w-52"
          value={filters.professional_id}
          onChange={e => onFilter({ professional_id: +e.target.value })}
          options={professionalOptions}
        />
      </FieldWrapper>

      <Show when={viewMode === "week"}>
        <DateWeekSelector
          label="Semana"
          value={{
            from: filters.date!,
            to: filters.date_to!,
          }}
          onValueChange={v => onFilter({
            date: v?.from,
            date_to: v?.to,
          })}
        />
      </Show>

      <Show when={viewMode === "day"}>
        <DatePicker
          label="Fecha"
          value={filters.date}
          onValueChange={v => onFilter({ date: v, date_to: null })}
        />
      </Show>

      <Button variant="outline" onClick={handleSelectCurrentWeek}>
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
