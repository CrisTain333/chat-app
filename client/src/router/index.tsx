import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
