import { FunnelIcon, FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { Show } from "@/components/show";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/day-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { WeekPicker } from "@/components/ui/week-picker";
import { dateHelper } from "@/lib/date-helper";

import { useAppointmentFilterController } from "../hooks/use-appointment-filter-controller";

function ModalAppointmentFilters() {
  const {
    filters,
    viewMode,
    searchRef,
    professionOptions,
    filteredProfessional,
    onFilter,
    handelSearch,
    handleSelectToday,
    handleClearSearch,
    handleViewModeChange,
    handleClearAllFilters,
    handleRefreshAppointments,
  } = useAppointmentFilterController();
  return (
    <>
      <DefaultTooltip content="Refrescar datos">
        <Button variant="outline" size="icon" onClick={handleRefreshAppointments}>
          <RotateCcwIcon size={20} />
        </Button>
      </DefaultTooltip>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            Filtros
            <FunnelIcon size={20} />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtros</DialogTitle>
            <DialogDescription hidden>
            </DialogDescription>
          </DialogHeader>

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
                classNames={{
                  trigger: "w-full",
                }}
                value={filters.date_from && filters.date_to
                  ? {
                      from: filters.date_from,
                      to: filters.date_to,
                    }
                  : undefined}
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
                options={filteredProfessional}
                value={filters.professional_id ?? ""}
                onChange={e => onFilter({ professional_id: +e.target.value })}
              />
            </FieldWrapper>

            <Search
              ref={searchRef}
              classNames={{
                input: "w-full",
              }}
              label="Rut paciente"
              onSearch={handelSearch}
              key={filters.patient_rut}
              onClearValue={handleClearSearch}
              defaultValue={filters.patient_rut ?? ""}
            />

            <Button variant="outline" onClick={handleClearAllFilters}>
              <span>Limpiar</span>
              <FunnelXIcon size={20} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { ModalAppointmentFilters };
