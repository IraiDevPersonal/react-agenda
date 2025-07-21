import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { ROUTES } from "@/constants/routes";

import AgendaPage from "./agenda/page";
import Layout from "./layout";

const router = createBrowserRouter([{
  path: ROUTES.root,
  children: [
    {
      path: ROUTES.agenda,
      element: <Layout />,
      children: [
        {
          index: true,
          path: ":appointmentUid?",
          element: <AgendaPage />,
        },
      ],
    },
    {
      index: true,
      element: <Navigate to={ROUTES.agenda} />,
    },
  ],
}, {
  path: "*",
  element: <Navigate to={ROUTES.agenda} />,
}]);

export function Router() {
  return <RouterProvider router={router} />;
}
