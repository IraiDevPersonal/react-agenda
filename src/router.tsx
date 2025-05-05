import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import AgendaLayout from "./modules/agenda/agenda-layout";
import AgendaPage from "./modules/agenda/agenda-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AgendaLayout />,
    children: [
      {
        index: true,
        element: <AgendaPage />,
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
