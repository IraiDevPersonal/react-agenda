import type { HttpClientImpl } from "@/lib/http-client";

import type { ProfessionForFilterModel } from "./models/profession-for-filters-model";
import { ProfessionForFiltersMapper } from "./mappers/profession-for-filters-mapper";
import { ProfessionMapper } from "./mappers/profession-mapper";
import { ProfessionModel } from "./models/profession-model";

export type ProfessionServiceImpl = {
  getProfessions: (filters: object) => Promise<ProfessionModel[]>
  getProfessionsForFilters: () => Promise<ProfessionForFilterModel[]>;
};

export class ProfessionService implements ProfessionServiceImpl {
  private readonly client: HttpClientImpl;
  private readonly endpoint: string;

  constructor({ client, endpoint }: { client: HttpClientImpl; endpoint: string }) {
    this.client = client;
    this.endpoint = endpoint;
  }

  private forFilter = () => {
    return `${this.endpoint}/for-filter`;
  };

  getProfessions = async (filters: object) => {
    const { data } = await this.client.get(this.endpoint, { params: filters })
    return ProfessionMapper.fromApiToDomain(data)
  }

  getProfessionsForFilters = async () => {
    const { data } = await this.client.get(this.forFilter());
    return ProfessionForFiltersMapper.fromApiToDomain(data);
  };
}