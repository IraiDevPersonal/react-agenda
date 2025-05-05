import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <AuthLayout />,
    children: [
      {
        index: true,
        element: "Page",
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
