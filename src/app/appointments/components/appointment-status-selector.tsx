import { FieldWrapper } from "@/components/ui/field-wrapper";
import { SelectNative } from "@/components/ui/select-native";
import { cn } from "@/lib/utils";

import { AppointmentStatus } from "../models/type";
import { useStatusStore } from "../stores/status-store";

type Props = {
  fullwidth?: boolean;
};

function AppointmentStatusSelector({ fullwidth }: Props) {
  const status = useStatusStore(s => s.status);
  const onChangeStatus = useStatusStore(s => s.onChangeStatus);

  return (
    <FieldWrapper label="Estado">
      <SelectNative
        className={cn("w-[130px]", fullwidth && "w-full")}
        withEmptyOption={false}
        options={[
          { value: "ALL", label: "Todos" },
          { value: AppointmentStatus.AVAILABLE, label: "Disponible" },
          { value: AppointmentStatus.TO_CONFIRM, label: "Por confirmar" },
          { value: AppointmentStatus.CONFIRMED, label: "Confirmados" },
          { value: AppointmentStatus.CANCELLED, label: "Cancelados" },
        ]}
        value={status}
        onChange={onChangeStatus}
      />
    </FieldWrapper>
  );
}

export { AppointmentStatusSelector };
