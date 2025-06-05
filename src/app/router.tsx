import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router";

import { Routes } from "@/constants/routes.constant";

const router = createBrowserRouter([{
  path: Routes.root,
  children: [
    {
      path: Routes.agenda,
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <h1>Agenda Page</h1>,
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
