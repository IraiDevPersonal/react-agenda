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
      <Grid.Col className="capitalize">
        {isSameMonth(filters.date_from!, filters.date_to!)
          ? (format(filters.date_from!, "MMMM"))
          : (`${format(filters.date_from!, "MMM")} - ${format(filters.date_to!, "MMM")}`)}
      </Grid.Col>

      <For items={WEEK_DAYS}>
        {({ label, value }) => {
          const { date_from, date_to } = filters;
          const match = getAllDaysInDateRange(date_from, date_to).find(d => getDay(d) === value);
          const day = match ? format(match, "dd") : "--";

          return (
            <Grid.Col key={label}>
              {`${label} ${day}`}
            </Grid.Col>
          );
        }}
      </For>
    </Grid.Header>
  );
}

export { WeekGridHeader };
