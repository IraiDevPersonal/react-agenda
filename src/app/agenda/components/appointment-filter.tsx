import { useState } from "react";

import type { DateWeekRange } from "@/types/global.type";

import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { DateWeekSelector } from "@/components/ui/date-week-selector";
import { DatePicker } from "@/components/ui/day-picker";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { dateHelper } from "@/lib/date-helper";

import type { AppointmentViewMode } from "../types";

import { useAppointmentUiStore } from "../stores/appointment-ui-store";

function AppointmentFilter() {
  const viewMode = useAppointmentUiStore(s => s.viewMode);
  const onViewModeChange = useAppointmentUiStore(s => s.onViewModeChange);

  const [week, setWeek] = useState<DateWeekRange | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [profession, setProfession] = useState("");
  const [professional, setProfessional] = useState("");

  const handleSelectCurrentWeek = () => {
    setWeek(dateHelper.getWeekRange(new Date()));
  };

  return (
    <>
      <FieldWrapper>
        <Label>Profesión</Label>
        <SelectNative
          className="w-52"
          value={profession}
          onChange={e => setProfession(e.target.value)}
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
          value={professional}
          onChange={e => setProfessional(e.target.value)}
          options={[
            { label: "Profesional 1", value: "1" },
            { label: "Profesional 2", value: "2" },
          ]}
        />
      </FieldWrapper>

      <Show when={viewMode === "week"}>
        <DateWeekSelector label="Semana" value={week} onValueChange={setWeek} />
      </Show>

      <Show when={viewMode === "day"}>
        <DatePicker label="Fecha" value={date} onValueChange={setDate} />
      </Show>

      <Button variant="outline" onClick={handleSelectCurrentWeek}>
        Hoy
      </Button>

      <SelectNative
        value={viewMode}
        withEmptyOption={false}
        onChange={e => onViewModeChange(e.target.value as AppointmentViewMode)}
        options={[
          { label: "Día", value: "day" },
          { label: "Semana", value: "week" },
        ]}
      />
    </>
  );
}

export { AppointmentFilter };
