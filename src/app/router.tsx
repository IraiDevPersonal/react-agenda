import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { ROUTES } from "@/constants/routes";

import AgendaPage from "./agenda/page";
import Layout from "./layout";
import PatientPage from "./patient/page";

const router = createBrowserRouter([{
  path: ROUTES.root,
  element: <Layout />,
  children: [
    {
      path: ROUTES.agenda,
      children: [
        {
          index: true,
          path: ":appointmentUid?",
          element: <AgendaPage />,
        },
      ],
    },
    {
      path: ROUTES.patients,
      children: [
        {
          index: true,
          element: <PatientPage />,
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
