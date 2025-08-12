import type { HttpClientImpl } from "@/lib/http-client";

import type { ProfessionalDetailResponseModel } from "./domain/models/professional-detail-model";
import type { ProfessionalForFilterModel } from "./domain/models/professional-for-filters-model";
import type { ProfessionalResponseModel } from "./domain/models/professional-model";

import { ProfessionalDetailMapper } from "./mappers/professional-detail-mapper";
import { ProfessionalForFiltersMapper } from "./mappers/professional-for-filters-mapper";
import { ProfessionalMapper } from "./mappers/professional-mapper";

export type ProfessionalServiceImpl = {
  getProfessionals: (filters: object) => Promise<ProfessionalResponseModel>;
  getProfessionalByUid: (uid: string) => Promise<ProfessionalDetailResponseModel>;
  getProfessionalsForFilters: () => Promise<ProfessionalForFilterModel[]>;
};

export class ProfessionalService implements ProfessionalServiceImpl {
  private readonly endpoint: string;
  private readonly client: HttpClientImpl;

  constructor({ endpoint, client }: { endpoint: string; client: HttpClientImpl }) {
    this.endpoint = endpoint;
    this.client = client;
  }

  getProfessionals = async (filters: object) => {
    // this.client.useAuthentication() TODO: para endpoint que requieran autenticacion
    const { data } = await this.client.get(this.endpoint, { params: filters });
    return ProfessionalMapper.fromApiToDomain(data);
  };

  getProfessionalByUid = async (uid: string) => {
    const { data } = await this.client.get(`${this.endpoint}/${uid}`);
    return ProfessionalDetailMapper.fromApiToDomain(data);
  };

  getProfessionalsForFilters = async () => {
    const { data } = await this.client.get(`${this.endpoint}/for-filter`);
    return ProfessionalForFiltersMapper.fromApiToDomain(data);
  };
}
