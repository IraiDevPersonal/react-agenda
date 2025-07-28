import { HttpClient } from "@/lib/http-client";

export const AgendaApi = HttpClient.create({
  baseURL: "http://localhost:3000/api",
});
