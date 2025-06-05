import type { AxiosInstance, CreateAxiosDefaults } from "axios";

import axios from "axios";

type HttpClient = {
  create: (config: CreateAxiosDefaults & { withAutorizacion?: boolean }) => AxiosInstance;
};

export const httpClient: HttpClient = {
  create: ({ withAutorizacion = false, ...config }) => {
    const axiosInstance = axios.create(config);

    if (withAutorizacion) {
      const AuthToken = localStorage.getItem("token"); // TODO: reemplazar por AUTH_TOKEN almacenado en LocalStorage

      if (!AuthToken)
        throw new Error("No existe token...");

      axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${AuthToken}`;
        return config;
      });
    }

    return axiosInstance;
  },
};

export const httpHelper = {
  getErrorMessage: (error: unknown) => {
    let errorMessage = "";
    const axiosError = axios.isAxiosError(error) ? error : null;

    if (axiosError) {
      if (axiosError.response) {
        errorMessage = axiosError.response.data?.message || "Error inesperado...";
      }
      else if (axiosError.request) {
        errorMessage = "No se recibió respuesta del servidor...";
      }
      else {
        errorMessage = axiosError.message;
      }
    }
    else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return errorMessage;
  },
};
