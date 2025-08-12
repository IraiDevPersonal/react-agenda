import type { HttpClientImpl } from "@/lib/http-client";

import type { UpsertPatientResponseModel } from "./domain/models/patient-action-model";
import type { PatientDetailResponseModel } from "./domain/models/patient-detail-model";
import type { PatientFormValues } from "./domain/models/patient-form-model";
import type { PatientResponseModel } from "./domain/models/patient-model";

import { PatientDetailMapper } from "./mappers/patient-detail-adapter";
import { PatientMapper } from "./mappers/patient-mapper";

export type PatientServiceImpl = {
  getPatients: (filters: object) => Promise<PatientResponseModel>;
  getPatientByUid: (uid: string) => Promise<PatientDetailResponseModel>;
  togglePatientStatus: (uid: string) => Promise<UpsertPatientResponseModel>;
  createPatient: (payload: PatientFormValues) => Promise<UpsertPatientResponseModel>;
  updatePatient: (uid: string, payload: PatientFormValues) => Promise<UpsertPatientResponseModel>;
};

export class PatientService implements PatientServiceImpl {
  private readonly client: HttpClientImpl;
  private readonly endpoint: string;

  constructor({ client, endpoint }: { client: HttpClientImpl; endpoint: string }) {
    this.client = client;
    this.endpoint = endpoint;
  }

  private withUid = (uid: string) => {
    return `${this.endpoint}/${uid}`;
  };

  getPatients = async (filters: object) => {
    const { data } = await this.client.get(this.endpoint, { params: filters });
    return PatientMapper.fromApiToDomain(data);
  };

  getPatientByUid = async (uid: string) => {
    const { data } = await this.client.get(this.withUid(uid));
    return PatientDetailMapper.fromApiToDomain(data);
  };

  updatePatient = async (uid: string, payload: PatientFormValues) => {
    const { data } = await this.client.put(this.withUid(uid), payload);
    return PatientMapper.upsertFromApiToDomain(data);
  };

  createPatient = async (payload: PatientFormValues) => {
    const { data } = await this.client.post(this.endpoint, payload);
    return PatientMapper.upsertFromApiToDomain(data);
  };

  togglePatientStatus = async (uid: string) => {
    const { data } = await this.client.patch(this.withUid(uid), {});
    return PatientMapper.upsertFromApiToDomain(data);
  };
}
