import { FunnelIcon, FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { SearchPatient } from "@/app/patients/components/search-patient";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";
import { stringToNullableNumber } from "@/lib/utils";

import { useAppointmentFilterOptions } from "../hooks/use-appointment-filter-options";
import { useAppointmentFilters } from "../hooks/use-appointment-filters";
import { AppointmentDateSelector } from "./appointment-date-selector";
import { AppointmentStatusSelector } from "./appointment-status-selector";
import { AppointmentViewModeSelector } from "./appointment-view-mode-selector";

function ModalAppointmentFilters() {
  const {
    filters,
    onFilter,
    handleRefresh,
    handleSelectToday,
    handleClearAllFilters,
  } = useAppointmentFilters();
  const {
    professionOptions,
    filteredProfessionalOptions,
  } = useAppointmentFilterOptions();

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
            <AppointmentViewModeSelector />

            <AppointmentStatusSelector fullwidth />

            <FieldWrapper label="Profesión">
              <SelectNative
                options={professionOptions}
                value={filters.profession_id ?? ""}
                onChange={e => onFilter({
                  profession_id: stringToNullableNumber(e.target.value),
                  professional_id: null,
                })}
              />
            </FieldWrapper>

            <FieldWrapper label="Profesional">
              <SelectNative
                options={filteredProfessionalOptions}
                value={filters.professional_id ?? ""}
                onChange={e => onFilter({
                  professional_id: stringToNullableNumber(e.target.value),
                })}
              />
            </FieldWrapper>

            <SearchPatient
              autoFocus
              label="Rut paciente"
              key={filters.patient_rut}
              classNames={{ input: "w-full" }}
              defaultValue={filters.patient_rut ?? ""}
              onSearch={v => onFilter({ patient_rut: v })}
            />

            <AppointmentDateSelector fullwidth />

            <Button variant="outline" onClick={handleSelectToday}>
              Hoy
            </Button>

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
