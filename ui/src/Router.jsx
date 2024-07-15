import { createBrowserRouter } from "react-router-dom";
import { CreateUser, RecordUser, Users, ViewUser, Error, SharedLayout } from './pages';

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    // errorElement: <Error />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      {
        path: "create",
        element: <CreateUser />,
      },
      {
        path: "record",
        element: <RecordUser />,
      },
      {
        path: "users/:id",
        element: <ViewUser />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);