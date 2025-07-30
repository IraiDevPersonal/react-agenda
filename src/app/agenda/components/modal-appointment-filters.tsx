import { FunnelIcon, FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog } from "@/components/ui/dialog";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { WeekPicker } from "@/components/ui/week-picker";
import { dateHelper } from "@/lib/date-helper";

import { useAppointmentFilterController } from "../hooks/use-appointment-filter-controller";
import { useAppointmentFilterOptions } from "../hooks/use-appointment-filter-options";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";

function ModalAppointmentFilters() {
  const {
    viewMode,
    searchRef,
    onFilter,
    handelSearch,
    handleRefresh,
    handleSelectToday,
    handleViewModeChange,
    handleClearAllFilters,
  } = useAppointmentFilterController();
  const { professionOptions, filteredProfessionals } = useAppointmentFilterOptions();
  const { filters } = useAppointmentFilters();

  return (
    <>
      <DefaultTooltip content="Refrescar datos">
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RotateCcwIcon size={20} />
        </Button>
      </DefaultTooltip>

      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="outline">
            Filtros
            <FunnelIcon size={20} />
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Filtrar citas</Dialog.Title>
            <Dialog.Description hidden>
            </Dialog.Description>
          </Dialog.Header>

          <div className="space-y-4 *:w-full">
            <FieldWrapper label="Modo de vista">
              <SelectNative
                value={viewMode}
                withEmptyOption={false}
                onChange={handleViewModeChange}
                options={[
                  { label: "Día", value: "day" },
                  { label: "Semana", value: "week" },
                ]}
              />
            </FieldWrapper>

            <Show when={viewMode === "week"}>
              <WeekPicker
                label="Semana"
                classNames={{ trigger: "w-full" }}
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
                label="Fecha"
                classNames={{
                  trigger: "w-full",
                }}
                value={filters.date ?? undefined}
                onValueChange={v => onFilter({ date: dateHelper.normalizeDate(v) })}
              />
            </Show>

            <Button variant="outline" onClick={() => handleSelectToday(viewMode)}>
              Hoy
            </Button>

            <FieldWrapper label="Profesión">
              <SelectNative
                options={professionOptions}
                value={filters.profession_id ?? ""}
                onChange={e => onFilter({ profession_id: +e.target.value, professional_id: null })}
              />
            </FieldWrapper>

            <FieldWrapper label="Profesional">
              <SelectNative
                options={filteredProfessionals}
                value={filters.professional_id ?? ""}
                onChange={e => onFilter({ professional_id: +e.target.value })}
              />
            </FieldWrapper>

            <Search
              ref={searchRef}
              label="Rut paciente"
              onSearch={handelSearch}
              key={filters.patient_rut}
              classNames={{ input: "w-full" }}
              defaultValue={filters.patient_rut ?? ""}
            />

            <Button variant="outline" onClick={handleClearAllFilters}>
              <span>Limpiar filtros</span>
              <FunnelXIcon size={20} />
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

export { ModalAppointmentFilters };
