import { safeArray } from "@/lib/utils";
import { uuid } from "@/lib/uuid";

import type { Appointment } from "../types/appointment";

import { AppointmentStatus } from "../types/appointment";

function createDefault(): Appointment {
  return {
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
}

function itemAdapter(item: Record<string, any> | undefined) {
  if (typeof item !== "object" || Array.isArray(item)) {
    console.warn("appointment.adapter: entrada en formato no esperado!!");
    return createDefault();
  }

  return {
    ...createDefault(),
    ...item,
  } satisfies Appointment;
}

export const appointmentAdapter = {
  httpResponse: (data: unknown) => safeArray<Appointment>(data).map(itemAdapter),
  item: itemAdapter,
};
