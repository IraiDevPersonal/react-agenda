import { useState } from "react";

import type { DateWeekRange } from "@/types/global.type";

import { Button } from "@/components/ui/button";
import { DateWeekSelector } from "@/components/ui/date-week-selector";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { dateHelper } from "@/lib/date-helper";

function AppointmentFilter() {
  const [week, setWeek] = useState<DateWeekRange | undefined>(undefined);
  const [view, setView] = useState("week");
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

      <DateWeekSelector label="Semana" value={week} onValueChange={setWeek} />

      <Button variant="outline" onClick={handleSelectCurrentWeek}>
        Hoy
      </Button>

      <SelectNative
        value={view}
        withEmptyOption={false}
        onChange={e => setView(e.target.value)}
        options={[
          { label: "Día", value: "day" },
          { label: "Semana", value: "week" },
        ]}
      />
    </>
  );
}

export { AppointmentFilter };
