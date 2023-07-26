import { createBrowserRouter } from "react-router-dom";
import Chat from "../pages/chat/Chat";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    ),
  },
  // {
  //   path: "/chat",
  //   element: <Chat />,
  // },
  {
    path: "/auth/login",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);
