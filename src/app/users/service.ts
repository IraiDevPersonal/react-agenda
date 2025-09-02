import type { HttpClientImpl } from "@/lib/http-client";

import type { UserDetailResponseModel } from "./models/user-detail-model";
import type { UserForFilterModel } from "./models/user-for-filters-model";
import type { UserResponseModel } from "./models/user-model";

import { UserDetailMapper } from "./mappers/user-detail-mapper";
import { UserForFiltersMapper } from "./mappers/user-for-filters-mapper";
import { UserMapper } from "./mappers/user-mapper";

export type UserServiceImpl = {
  getUsers: (filters: object) => Promise<UserResponseModel>;
  getUserByUid: (uid: string) => Promise<UserDetailResponseModel>;
  getUsersForFilters: () => Promise<UserForFilterModel[]>;
};

export class UserService implements UserServiceImpl {
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

  getUsers = async (filters: object) => {
    // this.client.useAuthentication() TODO: para endpoint que requieran autenticacion
    const { data } = await this.client.get(this.endpoint, { params: filters });
    return UserMapper.fromApiToDomain(data);
  };

  getUserByUid = async (uid: string) => {
    const { data } = await this.client.get(this.withUid(uid));
    return UserDetailMapper.fromApiToDomain(data);
  };

  getUsersForFilters = async () => {
    const { data } = await this.client.get(this.forFilter());
    return UserForFiltersMapper.fromApiToDomain(data);
  };
}
