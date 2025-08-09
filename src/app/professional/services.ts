import { AgendaApi } from "@/api/agenda-api";
import { sleep } from "@/lib/utils";

import type { ProfessionalFilters } from "./domain/models/types";

import { ProfessionalDetailMapper } from "./mappers/professional-detail-mapper";
import { ProfessionalForFiltersMapper } from "./mappers/professional-for-filters-mapper";
import { ProfessionalMapper } from "./mappers/professional-mapper";

async function getAll(filters: ProfessionalFilters) {
  await sleep();
  const { data } = await AgendaApi.get("/professionals", { params: filters });
  return ProfessionalMapper.fromApiToDomain(data);
}

async function getDetail(uid: string) {
  await sleep();
  const { data } = await AgendaApi.get(`/professionals/${uid}`);
  return ProfessionalDetailMapper.fromApiToDomain(data);
}

async function getForFilters() {
  const { data } = await AgendaApi.get("/professionals/for-filter");
  return ProfessionalForFiltersMapper.fromApiToDomain(data);
}

export const ProfessionalServices = {
  getAll,
  getDetail,
  getForFilters,
};
