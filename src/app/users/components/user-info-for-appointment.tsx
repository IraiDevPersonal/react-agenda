import { TextItem } from "@/components/ui/text-item";

import type { UserForAppointmentDetailModel } from "../models/user-for-appointment-detail-model";

type Props = {
  user: UserForAppointmentDetailModel;
};

function UserInfoForAppointment({ user }: Props) {
  return (
    <div>
      <h5 className="text-lg font-semibold">Datos del user:</h5>

      <TextItem>
        <TextItem.Label>Nombre:</TextItem.Label>
        <TextItem.Value capitalize>{user.fullname}</TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Profesión(es):</TextItem.Label>
        <TextItem.Value capitalize>{user.professions.join(", ")}</TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Metodos de pago:</TextItem.Label>
        <TextItem.Value capitalize>
          {user.pay_methods.join(", ")}
        </TextItem.Value>
      </TextItem>

      <TextItem>
        <TextItem.Label>Metodo de confirmación:</TextItem.Label>
        <TextItem.Value capitalize>
          {user.confirm_methods.join(", ")}
        </TextItem.Value>
      </TextItem>
    </div>
  );
}

export { UserInfoForAppointment };
