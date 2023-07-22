import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
