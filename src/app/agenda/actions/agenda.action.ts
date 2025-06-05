import { agendaService } from "@/services/agenda.service";

export async function getAgenda() {
  // const search = this.stringifyFilters(filters);
  const { data } = await agendaService.get(`/agenda?`);
  return data;
}
