import type { ProfessionalForAppointmentDetail } from "../components/types/professional";

import { ProfessionalForAppointmentDetailSchema } from "../components/types/professional";

export class ProfessionalAdapter {
  static validate(item: any) {
    try {
      const data = this.mapper(item);
      return ProfessionalForAppointmentDetailSchema.parse(data);
    }
    catch (error) {
      throw new Error(`${error}`);
    }
  }

  private static mapper(item: any) {
    return {
      fullname: item.full_name,
      professions: item.professions,
      pay_methods: item.pay_methods,
      confirm_methods: item.confirm_methods,
    } satisfies ProfessionalForAppointmentDetail;
  }
};
