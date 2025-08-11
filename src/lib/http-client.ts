import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import axios from "axios";

import { CustomError } from "./custom-error";

export const HttpHelper = {
  isRequestCancelled(error: unknown): boolean {
    return axios.isCancel(error);
  },
};

export type HttpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T, D>(url: string, data: D, config?: AxiosRequestConfig) => Promise<AxiosResponse<T, D>>;
  put: <T, D>(url: string, data: D, config?: AxiosRequestConfig) => Promise<AxiosResponse<T, D>>;
  patch: <T, D>(url: string, data: D, config?: AxiosRequestConfig) => Promise<AxiosResponse<T, D>>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  useAuthentication: () => void;
};

export type ClientConfig = {
  headers?: Record<string, string>;
  baseURL: string;
  delay?: number;
};

export class HttpClientService implements HttpClient {
  private client: AxiosInstance;
  private config: ClientConfig;
  private tokenName: string;

  constructor(config: ClientConfig, tokenName: string) {
    this.config = {
      // headers: { "Content-Type": "application/json" },
      delay: 1000,
      ...config,
    };

    this.tokenName = tokenName;

    this.client = axios.create({
      baseURL: this.config.baseURL,
      headers: this.config.headers,
    });

    this.useResponseDelay();
  }

  private getAuthToken() {
    const token = localStorage.getItem(this.tokenName);

    if (!token) {
      throw new CustomError("No hay token de autenticación");
    }

    return token;
  }

  private useResponseDelay() {
    this.client.interceptors.response.use((response) => {
      if (this.config.delay) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(response);
          }, this.config.delay);
        });
      }
      return response;
    });
  }

  useAuthentication() {
    this.client.interceptors.request.use((config) => {
      const authToken = this.getAuthToken();
      config.headers.Authorization = `Bearer ${authToken}`;

      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T, D>> {
    return (await this.client.post<T>(url, data, config));
  }

  async put<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T, D>> {
    return this.client.put<T>(url, data, config);
  }

  async patch<T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T, D>> {
    return this.client.patch<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}
