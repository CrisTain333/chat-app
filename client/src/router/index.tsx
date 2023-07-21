import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/auth/login",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);
