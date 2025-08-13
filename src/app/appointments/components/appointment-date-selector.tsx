import { Show } from "@/components/show";
import { DatePicker } from "@/components/ui/date-picker";
import { WeekPicker } from "@/components/ui/week-picker";
import { dateHelper } from "@/lib/date-helper";

import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { useViewModeStore } from "../stores/view-mode-store";

type Props = {
  fullwidth?: boolean;
};

function AppointmentDateSelector({ fullwidth }: Props) {
  const {
    filters,
    onFilter,
  } = useAppointmentFilters();
  const viewMode = useViewModeStore(s => s.viewMode);

  return (
    <>
      <Show when={viewMode === "week"}>
        <WeekPicker
          classNames={{
            trigger: fullwidth ? "w-full" : undefined,
          }}
          label="Semana"
          value={
            filters.date_from && filters.date_to
              ? {
                  from: filters.date_from,
                  to: filters.date_to,
                }
              : undefined
          }
          onValueChange={v => onFilter({
            date_from: v?.from,
            date_to: v?.to,
          })}
        />
      </Show>

      <Show when={viewMode === "day"}>
        <DatePicker
          showControls
          label="Fecha"
          classNames={{
            label: fullwidth ? "text-center" : undefined,
            trigger: fullwidth ? "w-full" : undefined,
            root: fullwidth ? "w-full" : undefined,
          }}
          value={filters.date ?? undefined}
          onValueChange={v => onFilter({ date: dateHelper.normalizeDate(v) })}
        />
      </Show>
    </>
  );
}

export { AppointmentDateSelector };
