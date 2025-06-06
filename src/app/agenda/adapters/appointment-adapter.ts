import { safeArray } from "@/lib/utils";
import { uuid } from "@/lib/uuid";

import type { Appointment } from "../types/appointment";

import { AppointmentStatus } from "../types/appointment";

function createDefaultAppointment(): Appointment {
  return {
    uid: uuid.createV4(),
    date: "00-00-0000",
    time_from: "--:--",
    time_to: "--:--",
    patient_name: "S/N",
    patient_rut: "S/R",
    patient_phone: "S/T",
    professional_name: "S/N",
    professions: ["S/P"],
    appointment_status: AppointmentStatus.INDETERMINATE,
  };
}

function itemAdapter(entry: Record<string, any>) {
  if (typeof entry !== "object" || Array.isArray(entry)) {
    console.warn("httpResponseAdapter: entrada en formato no esperado!!");
    return createDefaultAppointment();
  }

  return {
    ...createDefaultAppointment(),
    ...entry,
  } satisfies Appointment;
}

export const appointmentAdapters = {
  httpResponse: (data: unknown) => safeArray<Appointment>(data).map(itemAdapter),
};
