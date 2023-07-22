import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
      <Toaster
        position="top-right"
        containerStyle={{
          // Add space at the top
          marginTop: "5rem",
        }}
        toastOptions={{
          duration: 4000,
          success: {
            iconTheme: {
              primary: "#4caf50",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f44336",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </ChakraProvider>
  </Provider>
);
