import type { HttpClientImpl } from "@/lib/http-client";

import type { ProfessionForFilterModel } from "./domain/models/profession-for-filters-model";

import { ProfessionalForFiltersMapper } from "./mappers/profession-for-filters-mapper";

export type ProfessionServiceImpl = {
  getProfessionsForFilters: () => Promise<ProfessionForFilterModel[]>;
};

export class ProfessionService implements ProfessionServiceImpl {
  private readonly client: HttpClientImpl;
  private readonly endpoint: string;

  constructor({ client, endpoint }: { client: HttpClientImpl; endpoint: string }) {
    this.client = client;
    this.endpoint = endpoint;
  }

  getProfessionsForFilters = async () => {
    const { data } = await this.client.get(`${this.endpoint}/for-filter`);
    return ProfessionalForFiltersMapper.fromApiToDomain(data);
  };
}
