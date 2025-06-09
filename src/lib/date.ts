import { format, parseISO, setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";

setDefaultOptions({ locale: es });

export const date = {
  format,
  parseISO,
};
