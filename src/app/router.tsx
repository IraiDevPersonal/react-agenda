import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { Routes } from "@/constants/routes.constant";

import AgendaPage from "./agenda/page";
import Layout from "./layout";

const router = createBrowserRouter([{
  path: Routes.root,
  children: [
    {
      path: Routes.agenda,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <AgendaPage />,
        },
      ],
    },
    {
      index: true,
      element: <Navigate to={Routes.agenda} />,
    },
  ],
}, {
  path: "*",
  element: <Navigate to={Routes.agenda} />,
}]);

export function Router() {
  return <RouterProvider router={router} />;
}
