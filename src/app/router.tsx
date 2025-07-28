import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { ROUTES } from "@/constants/routes";

import AgendaPage from "./agenda/page";
import Layout from "./layout";
import CreatePatientPage from "./patient/pages/create-patient-page";
import PatientPage from "./patient/pages/patient-page";
import UpdatePatientPage from "./patient/pages/update-patient-page";

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
        {
          path: ROUTES.actions.create,
          element: <CreatePatientPage />,
        },
        {
          path: ":patientUid",
          element: <UpdatePatientPage />,
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
