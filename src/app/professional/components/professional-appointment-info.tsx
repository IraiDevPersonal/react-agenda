import type { OneAppointment } from "@/app/agenda/types/one-appointment";

import { TextItem } from "@/components/ui/text-item";

type Props = {
  professional: OneAppointment["professional"];
};

function ProfessionalAppointmentInfo({ professional }: Props) {
  return (
    <div>
      <h5 className="text-lg font-semibold">Datos profesional:</h5>

      <TextItem>
        <TextItem.Label>Nombre:</TextItem.Label>
        <TextItem.Value capitalize>{professional.fullname}</TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Profesión(es):</TextItem.Label>
        <TextItem.Value capitalize>{professional.professions.join(", ")}</TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Metodos de pago:</TextItem.Label>
        <TextItem.Value capitalize>
          {professional.pay_methods.join(", ")}
        </TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Metodo de confirmación:</TextItem.Label>
        <TextItem.Value capitalize>
          {professional.confirm_methods.join(", ")}
        </TextItem.Value>
      </TextItem>
    </div>
  );
}

export { ProfessionalAppointmentInfo };
