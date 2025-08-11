import type { HttpClientImpl } from "@/lib/http-client";

import type { AppointmentDetailModel } from "./domain/models/appointment-detail-model";
import type { AppointmentModel } from "./domain/models/appointment-model";

import { AppointmentDetailMapper } from "./mappers/appointment-detail-mapper";
import { AppointmentMapper } from "./mappers/appointment-mapper";

export type AppointmentServiceImpl = {
  getAppointments: (filters: object) => Promise<AppointmentModel[]>;
  getAppointmentByUid: (uid: string) => Promise<AppointmentDetailModel>;
};

export class AppointmentService implements AppointmentServiceImpl {
  private readonly client: HttpClientImpl;
  private readonly endpoint: string;

  constructor({ client, endpoint }: { client: HttpClientImpl; endpoint: string }) {
    this.client = client;
    this.endpoint = endpoint;
  }

  getAppointments = async (filters: object) => {
    const { data } = await this.client.get(this.endpoint, { params: filters });
    return AppointmentMapper.fromApiToDomain(data);
  };

  getAppointmentByUid = async (uid: string) => {
    const { data } = await this.client.get(`${this.endpoint}/${uid}`);
    return AppointmentDetailMapper.fromApiToDomain(data);
  };
}
