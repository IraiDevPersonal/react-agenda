import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import AgendaLayout from "@/modules/agenda/layout";
import AgendaPage from "@/modules/agenda/page";
import AuthenticatedLayout from "@/modules/auth/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/agenda",
        element: <AgendaLayout />,
        children: [
          {
            index: true,
            element: <AgendaPage />,
          },
        ],
      },
      {
        index: true,
        element: <Navigate to="/agenda" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
