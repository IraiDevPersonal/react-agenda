import type { HttpClientImpl } from "@/lib/http-client";

import type { ProfessionalDetailResponseModel } from "./models/professional-detail-model";
import type { ProfessionalForFilterModel } from "./models/professional-for-filters-model";
import type { ProfessionalResponseModel } from "./models/professional-model";

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

  private withUid = (uid: string) => {
    return `${this.endpoint}/${uid}`;
  };

  private forFilter = () => {
    return `${this.endpoint}/for-filter`;
  };

  getProfessionals = async (filters: object) => {
    // this.client.useAuthentication() TODO: para endpoint que requieran autenticacion
    const { data } = await this.client.get(this.endpoint, { params: filters });
    return ProfessionalMapper.fromApiToDomain(data);
  };

  getProfessionalByUid = async (uid: string) => {
    const { data } = await this.client.get(this.withUid(uid));
    return ProfessionalDetailMapper.fromApiToDomain(data);
  };

  getProfessionalsForFilters = async () => {
    const { data } = await this.client.get(this.forFilter());
    return ProfessionalForFiltersMapper.fromApiToDomain(data);
  };
}
