import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/query-keys";

import { agendaActions } from "./actions/agenda.actions";

function AgendaPage() {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.appointments],
    queryFn: () => agendaActions.getAgenda(),
  });

  return (
    <main>
      <h1>Pagia agenda</h1>
      {isLoading && "cargando..."}
      <ul>
        {
          data?.map(item => (
            <li key={item.uid}>
              {item.uid}
              {" "}
              /
              {item.professional_name}
              {" "}
              /
              {item.patient_name}
              {" "}
              / (
              {item.date}
              )
            </li>
          ))
        }
      </ul>
    </main>
  );
}

export default AgendaPage;
