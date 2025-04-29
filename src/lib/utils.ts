import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Feriados de Chile para 2025
const chileanHolidays2025 = [
  new Date(2025, 0, 1), // Año Nuevo
  new Date(2025, 3, 18), // Viernes Santo
  new Date(2025, 3, 19), // Sábado Santo
  new Date(2025, 4, 1), // Día del Trabajo
  new Date(2025, 4, 21), // Día de las Glorias Navales
  new Date(2025, 5, 29), // San Pedro y San Pablo
  new Date(2025, 6, 16), // Día de la Virgen del Carmen
  new Date(2025, 7, 15), // Asunción de la Virgen
  new Date(2025, 8, 18), // Fiestas Patrias
  new Date(2025, 8, 19), // Día de las Glorias del Ejército
  new Date(2025, 9, 12), // Día del Encuentro de Dos Mundos
  new Date(2025, 9, 31), // Día de las Iglesias Evangélicas
  new Date(2025, 10, 1), // Día de Todos los Santos
  new Date(2025, 11, 8), // Inmaculada Concepción
  new Date(2025, 11, 25), // Navidad
];

// Función para verificar si un día es feriado
export function isHoliday(date: Date) {
  return chileanHolidays2025.some(
    holiday =>
      holiday.getDate() === date.getDate()
      && holiday.getMonth() === date.getMonth()
      && holiday.getFullYear() === date.getFullYear(),
  );
}
