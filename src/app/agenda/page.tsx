import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys";

import { getAgenda } from "./actions/agenda.action";

function AgendaPage() {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.appointments],
    queryFn: () => getAgenda(),
  });

  console.log({ data });

  return (
    <main>
      <h1>Pagia agenda</h1>
      {isLoading && "cargando..."}
    </main>
  );
}

export default AgendaPage;
