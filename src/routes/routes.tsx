/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/user/Register/Register";
import Home from "../components/Home/Home";
import AllBooks from "../components/Books/AllBooks";
import SingleBooks from "../components/Books/SingleBooks";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/all-books/:id",
        element: <SingleBooks />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },
]);

export default routes;
