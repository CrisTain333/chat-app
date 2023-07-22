import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import {
  useAppDispatch,
  useAppSelector,
} from "./redux/hooks";
import React from "react";
import { getUser } from "./redux/feature/user/userSlice";
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
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
