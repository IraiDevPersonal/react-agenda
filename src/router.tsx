import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import AgendaPage from "./modules/agenda/pages/agenda-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AgendaPage />,
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
