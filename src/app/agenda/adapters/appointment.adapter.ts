import { mergeObjects, safeArray } from "@/lib/utils";
import { uuid } from "@/lib/uuid";

import type { Appointment, OneAppointment } from "../types/appointment";

import { AppointmentStatus } from "../types/appointment";

function validateInput(value: Record<string, any> | undefined, message?: string) {
  if (typeof value !== "object" || Array.isArray(value)) {
    console.warn(message ?? "appointment.adapter: entrada en formato no esperado!!");
    return false;
  }
  return true;
}

function itemAdapter(value: Record<string, any> | undefined) {
  const defaultValue: Appointment = {
    uid: uuid.createV4(),
    date: "00-00-0000",
    time_from: "00:00",
    time_to: "00:00",
    patient_name: "Paciente sin nombre",
    patient_rut: "1.111.111-1",
    patient_phone: "+569 0000 0000",
    professional_name: "Profesional sin nombre",
    professions: ["S/P"],
    appointment_status: AppointmentStatus.INDETERMINATE,
  };

  if (!validateInput(value)) {
    return defaultValue;
  }

  return {
    ...defaultValue,
    ...value,
  } satisfies Appointment;
}

function oneAppointment(value: Record<string, any> | undefined) {
  const defaultValue: OneAppointment = {
    alert: {
      message: "",
      type: "",
    },
    patient: {
      email: "Paciente sin correo...",
      full_name: "Paciente sin nombre...",
      phone: "Paciente sin numero...",
      rut: "Paciente sin rut",
    },
    patient_history: [],
    professional: {
      confirm_method: [],
      full_name: "Profesional sin nombre",
      pay_method: [],
    },
  };

  if (!validateInput(value)) {
    return defaultValue;
  }

  const result = mergeObjects(defaultValue, value);

  return result satisfies OneAppointment;
}

export const appointmentAdapter = {
  getAppintmentsHttpResponse: (data: unknown) => safeArray<Appointment>(data).map(itemAdapter),
  getOneAppintmentHttpResponse: oneAppointment,
  item: itemAdapter,
};
