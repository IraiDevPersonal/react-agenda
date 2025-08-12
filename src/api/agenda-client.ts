import { HttpClient } from "@/lib/http-client";

export const agendaClient = new HttpClient({
  baseURL: "http://localhost:3000/api",
  delay: 1000,
}, "AUTH-TOKEN");
