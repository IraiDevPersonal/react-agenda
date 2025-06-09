import { format, parseISO, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";

setDefaultOptions({ locale: es });

export const date = {
  format,
  parseISO,
};

export enum DateFormats {
  "dd-MM-yyyy" = "dd-MM-yyyy",
  "EEEE dd 'de' MMMM 'de' yyyy" = "EEEE dd 'de' MMMM 'de' yyyy",
}
