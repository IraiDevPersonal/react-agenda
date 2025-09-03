import type { HttpClientImpl } from "@/lib/http-client";
import { ProfessinoalForFiltersMapper } from "./mappers/professional-for-filters-mapper";
import type { ProfessionalForFilterModel } from "./models/professional-for-filters-model";

export type ProfessionalServiceImpl = {
  getProfessionalForFilters: () => Promise<ProfessionalForFilterModel[]>;
};

export class ProfessionalService implements ProfessionalServiceImpl {
  private readonly endpoint: string;
  private readonly client: HttpClientImpl;

  constructor({
    endpoint,
    client,
  }: { endpoint: string; client: HttpClientImpl }) {
    this.endpoint = endpoint;
    this.client = client;
  }

  // private withUid = (uid: string) => {
  //   return `${this.endpoint}/${uid}`;
  // };

  private forFilter = () => {
    return `${this.endpoint}/for-filter`;
  };

  getProfessionalForFilters = async () => {
    const { data } = await this.client.get(this.forFilter());
    return ProfessinoalForFiltersMapper.fromApiToDomain(data);
  };
}
