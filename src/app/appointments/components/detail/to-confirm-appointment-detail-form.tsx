import { FieldWrapper } from "@/components/ui/field-wrapper";
import { SelectNative } from "@/components/ui/select-native";

import { APPOINTMENT_DETAIL_FORM_ID } from "../../lib/constants";

type Props = {
  pay_method: string;
};

function ToConfirmAppointmentDetailForm({ pay_method }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    console.log("formValues", Object.fromEntries(formValues));
  };

  return (
    <form
      id={APPOINTMENT_DETAIL_FORM_ID}
      className="grid grid-cols-2 gap-4 items-end w-full [&>div]:col-span-2"
      onSubmit={onSubmit}
      // onSubmit={mutation.mutate}
    >

      <FieldWrapper label="Forma de pago seleccionada" classNames={{ root: "col-span-2" }}>
        <SelectNative
          name="pay_method"
          options={[
            { value: "fonasa", label: "Bono Fonasa" },
            { value: "particular", label: "Particular" },
          ]}
          // disabled={mutation.isPending}
          defaultValue={pay_method}
          key={pay_method}
        />
      </FieldWrapper>
    </form>
  );
}

export { ToConfirmAppointmentDetailForm };
