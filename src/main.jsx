import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/theme-provider.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { AuthContextProvider } from "./context/auth-context.jsx";
import { baseURL } from "./services/baseURL.js";
import { EdgeStoreProvider } from "./context/edgestore-context.jsx";
import { CurrencyProvider } from "./context/currency-context.jsx";
import { SocketContextProvider } from "./context/socket-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <SocketContextProvider>
          <EdgeStoreProvider
            basePath={`${baseURL}/edgestore`}
            fetchOptions={{
              credentials: "include",
            }}
          >
            <CurrencyProvider>
              <App />
            </CurrencyProvider>
          </EdgeStoreProvider>
        </SocketContextProvider>
      </AuthContextProvider>
      <Toaster position="top-center" expand={false} richColors />
    </ThemeProvider>
  </StrictMode>
);
