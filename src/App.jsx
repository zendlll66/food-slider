// App.js
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Nopage from "./pages/Nopage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "/", element: <Homepage/> },
      { path: "*", element: <Nopage/> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
