import { For } from "@/components/for";
import { dateHelper } from "@/lib/date-helper";

import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { WEEK_DAYS } from "../lib/constants";
import { getAllDaysInDateRange } from "../lib/utils";
import { AppointmentGrid as Grid } from "./appointment-grid";

const { isSameMonth, format, getDay } = dateHelper;

function WeekGridHeader() {
  const { filters } = useAppointmentFilters();

  return (
    <Grid.Header className="grid-cols-[100px_1fr_1fr_1fr_1fr_1fr_1fr]">
      <Grid.HeaderCell className="capitalize text-right">
        {isSameMonth(filters.date_from!, filters.date_to!)
          ? (format(filters.date_from!, "MMMM"))
          : (`${format(filters.date_from!, "MMM")} - ${format(filters.date_to!, "MMM")}`)}
      </Grid.HeaderCell>

      <For items={WEEK_DAYS}>
        {({ label, value }) => {
          const match = getAllDaysInDateRange(filters.date_from, filters.date_to).find(d => getDay(d) === value);
          const day = match ? format(match, "dd") : "--";

          return (
            <Grid.HeaderCell key={label}>
              {`${label} ${day}`}
            </Grid.HeaderCell>
          );
        }}
      </For>
    </Grid.Header>
  );
}

export { WeekGridHeader };
