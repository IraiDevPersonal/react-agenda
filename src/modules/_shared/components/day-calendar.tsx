import { dateHelper } from "@/lib/date-helper";

type DayCalendarProps = {
  date: Date;
};

export function DayCalendar({ date }: DayCalendarProps) {
  // Filtrar citas para el día seleccionado
  // const dayAppointments = appointments.filter(appointment => isSameDay(parseISO(appointment.date), date));

  // const timedAppointments = dayAppointments.filter((appointment) => {
  //   const date = new Date(appointment.date);
  //   return date.getHours() !== 0 || date.getMinutes() !== 0;
  // });

  // Generar horas para la vista diaria (de 8 AM a 8 PM)
  const hours = Array.from({ length: 13 }, (_, i) => i + 8);

  // Verificar si el día seleccionado es domingo o feriado
  const isSunday = dateHelper.isSunday(date);
  const isDayHoliday = dateHelper.isHoliday(date);
  const isDisabled = isSunday || isDayHoliday;

  return (
    <>
      {isDisabled && (
        <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">
          {isSunday ? "No se pueden agendar citas los domingos." : "No se pueden agendar citas en días feriados."}
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        {/* Horas del día */}
        {hours.map((hour) => {
          // Filtrar citas para esta hora
          // const hourAppointments = timedAppointments.filter((appointment) => {
          //   const date = new Date(appointment.date);
          //   return date.getHours() === hour;
          // });

          return (
            <div key={hour} className="grid grid-cols-[100px_1fr] border-b last:border-b-0 odd:bg-muted-foreground/5">
              <div className="p-2 font-medium border-r text-right pr-4">
                {hour}
                :00
              </div>
              <div
                className="p-2 min-h-[60px] relative hover:bg-muted-foreground/15 transition-colors"
              >
                slot de cositas
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
