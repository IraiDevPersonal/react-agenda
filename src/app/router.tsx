import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { ROUTES } from "@/lib/constants/routes";

import AgendaPage from "./appointments/page";
import Layout from "./layout";
import CreatePatientPage from "./patients/pages/create-patient-page";
import PatientsPage from "./patients/pages/patients-page";
import UpdatePatientPage from "./patients/pages/update-patient-page";
import CreateUserPage from "./users/pages/create-user-page";
import UpdateUserPage from "./users/pages/update-user-page";
import UsersPage from "./users/pages/users-page";

const router = createBrowserRouter([
  {
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
            element: <PatientsPage />,
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
        path: ROUTES.users,
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
          {
            path: ROUTES.actions.create,
            element: <CreateUserPage />,
          },
          {
            path: ":userUid",
            element: <UpdateUserPage />,
          },
        ],
      },
      {
        index: true,
        element: <Navigate to={ROUTES.agenda} />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.agenda} />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
