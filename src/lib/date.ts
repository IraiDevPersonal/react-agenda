import { format, getDay, getISODay, parseISO, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";

setDefaultOptions({ locale: es, weekStartsOn: 1 });

export const date = {
  getISODay,
  parseISO,
  format,
  getDay,
};

export enum DateFormats {
  "dd-MM-yyyy" = "dd-MM-yyyy",
  "EEEE dd 'de' MMMM 'de' yyyy" = "EEEE dd 'de' MMMM 'de' yyyy",
}
