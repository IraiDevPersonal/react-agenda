import { useState } from "react";

import type { DateWeekRange } from "@/types/global.type";

import { Button } from "@/components/ui/button";
import { DateWeekSelector } from "@/components/ui/date-week-selector";
import { dateHelper } from "@/lib/date-helper";

function AppointmentFilterSection() {
  const [week, setWeek] = useState<DateWeekRange | undefined>(undefined);

  const handleSelectCurrentWeek = () => {
    setWeek(dateHelper.getWeekRange(new Date()));
  };

  return (
    <div className="flex gap-2">
      <DateWeekSelector label="Fecha" value={week} onValueChange={setWeek} />
      <Button variant="outline" onClick={handleSelectCurrentWeek} className="mt-5">
        Semana Actual
      </Button>
    </div>
  );
}

export { AppointmentFilterSection };
