import type { AxiosInstance, CreateAxiosDefaults } from "axios";

import axios from "axios";

type HttpClientCreateReturn = AxiosInstance & {
  useAuthInterceptor: () => void;
};

type HttpClient = {
  create: (config: CreateAxiosDefaults) => HttpClientCreateReturn;
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

export const httpClient: HttpClient = {
  create: (config) => {
    const instance: AxiosInstance = axios.create(config);

    return Object.assign(instance, {
      useAuthInterceptor: () => useAuthInterceptor(instance),
    });
  },
};

export const httpHelper = {
  getErrorMessage(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data?.message ?? "Error inesperado...";
      }
      if (error.request) {
        return "No se recibió respuesta del servidor...";
      }
      return error.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "Ocurrió un error desconocido.";
  },
};
