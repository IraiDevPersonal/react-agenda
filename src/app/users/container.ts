import { agendaClient } from "@/api/agenda-client";

import { UserQuery } from "./query";
import { UserService } from "./service";

const userService = new UserService({
  client: agendaClient,
  endpoint: "/users",
});

export const userQuery = new UserQuery(userService);
