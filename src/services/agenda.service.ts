import { HttpClient } from "@/lib/http-client";

export const AgendaService = HttpClient.create({
  baseURL: "http://localhost:3000/api",
});
