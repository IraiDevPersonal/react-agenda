import type { AxiosInstance, CreateAxiosDefaults } from "axios";

import axios from "axios";

type HttpClientCreateReturn = AxiosInstance & {
  useAuthInterceptor: () => void;
};

type HttpClient = {
  create: (config: CreateAxiosDefaults) => HttpClientCreateReturn;
  isRequestCancelled: (error: unknown) => boolean;
};

function useAuthInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use((config) => {
    const AuthToken = localStorage.getItem("token");

    if (!AuthToken) {
      return Promise.reject(new Error("No existe token..."));
    }

    config.headers.Authorization = `Bearer ${AuthToken}`;
    return config;
  });
}

export const HttpClient: HttpClient = {
  create: (config) => {
    const instance: AxiosInstance = axios.create(config);

    return Object.assign(instance, {
      useAuthInterceptor: () => useAuthInterceptor(instance),
    });
  },
  isRequestCancelled(error: unknown): boolean {
    return axios.isCancel(error);
  },
};
