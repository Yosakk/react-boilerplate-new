import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "@/locales/i18n";
import "./fonts/poppins";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { mantineTheme } from "./theme/mantine";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <HelmetProvider>
          <MantineProvider theme={mantineTheme} defaultColorScheme="light">
            <ModalsProvider>
              <Notifications position="top-right" zIndex={1000} />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </ModalsProvider>
          </MantineProvider>
        </HelmetProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
