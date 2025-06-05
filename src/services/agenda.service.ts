import { httpClient } from "@/lib/http-client";

export const agendaService = httpClient.create({
  baseURL: "http://localhost:3000/api",
})