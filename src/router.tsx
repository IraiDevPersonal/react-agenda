import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import AgendaPage from "./modules/agenda/agenda-page";
import AuthLayout from "./modules/auth/layouts/auth-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
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
