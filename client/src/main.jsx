import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AllUsers from "./pages/AllUsers/AllUsers";
import connexion from "./services/connexion";

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
            const offerTable = await connexion.get("/api/users");
            return offerTable.data;
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
