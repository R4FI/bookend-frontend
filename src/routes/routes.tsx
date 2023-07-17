/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/user/Register/Register";
import Home from "../components/Home/Home";
import AllBooks from "../components/Books/AllBooks";
import SingleBooks from "../components/Books/SingleBooks";
import Login from "../components/user/Login/Login";
import AddBook from "../components/Books/AddBook";
import PrivateRoute from "./PrivateRoute";
import MoadlButton from "../components/Button/ModalButton";

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
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/edit-book/:id",
        element: <MoadlButton book={AllBooks} />,
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
