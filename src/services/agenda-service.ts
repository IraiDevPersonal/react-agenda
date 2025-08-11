import { HttpClientService } from "@/lib/http-client";

export const agendaService = new HttpClientService({
  baseURL: "http://localhost:3000/api",
  delay: 2000,
}, "AUTH-TOKEN");
