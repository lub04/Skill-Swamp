import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AllUsers from "./pages/AllUsers/AllUsers";
import UserDetails from "./pages/UserDetails/UserDetails";
import connexion from "./services/connexion";
import MyProfile from "./pages/MyProfile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "utilisateurs",
        element: <AllUsers />,
        loader: async () => {
          try {
            const userTable = await connexion.get("/api/users");
            return userTable.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      {
        path: "utilisateurs/:id",
        element: <UserDetails />,
        loader: async ({ params }) => {
          try {
            const userDetails = await connexion.get(`/api/users/${params.id}`);
            return userDetails.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      },
      {
        path: "profil",
        element: <MyProfile />,
        loader: async () => {
          try {
            const userTable = await connexion.get("/api/users/mine");
            return userTable.data;
          } catch (error) {
            throw new Error(error);
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
