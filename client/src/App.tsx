import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {
  useAppDispatch,
  useAppSelector,
} from "./redux/hooks";
import React from "react";
import { getUser } from "./redux/feature/user/userSlice";
import "./pages/chat/chat.css";
const App = () => {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const callMe = async () => {
      if (token) {
        await dispatch(getUser(token));
      }
    };
    callMe();
  }, []);
  return (
    <div className="">
      <div
        className="App"
        style={{
          height:
            window.location.href ===
            "http://localhost:3000/chat"
              ? "calc(100vh - 2rem)"
              : "auto",
        }}
      >
        <div
          className="blur"
          style={{ top: "-18%", right: "0" }}
        ></div>
        <div
          className="blur"
          style={{ top: "36%", left: "-8rem" }}
        ></div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
};

export default App;
