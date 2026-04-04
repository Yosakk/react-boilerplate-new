import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import "./fonts/poppins";
import "@/locales/i18n";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { mantineTheme } from "./theme/mantine";
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ErrorBoundary from "./ErrorBoundary";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function App() {
  return (
    <StrictMode>
      <ErrorBoundary>
        <MantineProvider theme={mantineTheme} defaultColorScheme="light">
          <Provider store={store}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <HelmetProvider>
                <ModalsProvider>
                  <Notifications position="top-right" zIndex={1000} />
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                </ModalsProvider>
              </HelmetProvider>
            </GoogleOAuthProvider>
          </Provider>
        </MantineProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
