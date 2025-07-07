import { isValidObject, mergeObjects } from "@/lib/utils";

import type { OneAppointment } from "../types/one-appointment";

import { AppointmentStatus } from "../types/appointment";

export function oneAppointmentAdapter(value: Record<string, any> | undefined) {
  const defaultValue: OneAppointment = {
    status: AppointmentStatus.INDETERMINATE,
    date: "dd-mm-aaaa",
    is_enabled: false,
    time_from: "hh:mm",
    time_to: "hh:mm",
    alert: {
      message: "",
      is_required: false,
    },
    patient: {
      email: "Sin correo...",
      names: "Sin nombre...",
      lastnames: "Sin apellido...",
      phone: "Sin numero...",
      rut: "Sin rut",
      address: "Sin direccion",
    },
    patient_history: [],
    professional: {
      confirm_methods: [],
      fullname: "Sin nombre",
      pay_methods: [],
      professions: [],
    },
  };

  if (!isValidObject(value, "one-appointment-adapter: entrada en formato no esperado!!")) {
    return defaultValue;
  }

  const result = mergeObjects(defaultValue, value);

  return result satisfies OneAppointment;
}
