import { FunnelIcon, FunnelXIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { Search } from "@/components/ui/search";
import { SelectNative } from "@/components/ui/select-native";
import { DefaultTooltip } from "@/components/ui/tooltip";

function ModalPatientFilters() {
  // const {
  //   filters,
  //   viewMode,
  //   searchRef,
  //   onFilter,
  //   handelSearch,
  //   handleSelectToday,
  //   handleClearSearch,
  //   handleViewModeChange,
  //   handleClearAllFilters,
  //   handleRefreshAppointments,
  // } = useAppointmentFilterController();

  // const { professionOptions, filteredProfessionals } = useAppointmentFilterOptions();

  return (
    <>
      <DefaultTooltip content="Refrescar datos">
        <Button variant="outline" size="icon">
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
            <DialogTitle>Filtrar pacientes</DialogTitle>
            <DialogDescription hidden>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 *:w-full">
            <Search
              // ref={searchRef}
              label="Rut"
              className="w-full"
              // onSearch={handelSearch}
              // key={filters.patient_rut}
              // onClearValue={handleClearSearch}
              // defaultValue={filters.patient_rut ?? ""}
            />

            <Search
              // ref={searchRef}
              label="Nombre"
              className="w-full"
              // onSearch={handelSearch}
              // key={filters.patient_rut}
              // onClearValue={handleClearSearch}
              // defaultValue={filters.patient_rut ?? ""}
            />

            <Search
              // ref={searchRef}
              label="Correo"
              className="w-full"
              // onSearch={handelSearch}
              // key={filters.patient_rut}
              // onClearValue={handleClearSearch}
              // defaultValue={filters.patient_rut ?? ""}
            />

            <FieldWrapper label="Estado">
              <SelectNative
                // options={professionOptions}
                // value={filters.profession_id ?? ""}
                // onChange={e => onFilter({ profession_id: +e.target.value, professional_id: null })}
              />
            </FieldWrapper>

            <Button variant="outline">
              <span>Limpiar filtros</span>
              <FunnelXIcon size={20} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { ModalPatientFilters };
