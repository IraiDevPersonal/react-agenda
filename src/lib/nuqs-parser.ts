import { formatISO } from "date-fns"; // Sólo para serializar con seguridad
import { createParser } from "nuqs";

export const parseAsLocalDate = createParser<Date>({
  parse(query) {
    // Verificamos formato rápido
    if (!/^\d{4}-\d{2}-\d{2}$/.test(query))
      return null;

    // Extraemos partes y creamos Date local
    const [y, m, d] = query.split("-").map(Number);
    const date = new Date(y, m - 1, d);

    return Number.isNaN(date.getTime()) ? null : date;
  },
  serialize(date) {
    // formateamos a YYYY-MM-DD manteniendo la URL limpia
    return formatISO(date, { representation: "date" });
    // O simplemente: return date.toISOString().slice(0, 10);
  },
});
