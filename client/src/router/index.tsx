import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Chat from "../pages/chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
