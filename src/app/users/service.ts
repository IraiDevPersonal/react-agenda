import type { HttpClientImpl } from "@/lib/http-client";
import { UserDetailMapper } from "./mappers/user-detail-mapper";
import { UserMapper } from "./mappers/user-mapper";
import type { UserDetailResponseModel } from "./models/user-detail-response-model";
import type { UserResponseModel } from "./models/user-response-model";

export type UserServiceImpl = {
  getUsers: (filters: object) => Promise<UserResponseModel>;
  getUserByUid: (uid: string) => Promise<UserDetailResponseModel>;
};

export class UserService implements UserServiceImpl {
  private readonly endpoint: string;
  private readonly client: HttpClientImpl;

  constructor({
    endpoint,
    client,
  }: { endpoint: string; client: HttpClientImpl }) {
    this.endpoint = endpoint;
    this.client = client;
  }

  private withUid = (uid: string) => {
    return `${this.endpoint}/${uid}`;
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
}
