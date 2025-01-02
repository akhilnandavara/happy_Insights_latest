import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "react-datepicker/dist/react-datepicker.css";
import "./styles/global.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { configureStore } from "@reduxjs/toolkit";

import useSsoId from "./hooks/useSsoId.js";
import LoadingSpinner from "./components/Loader";
import ErrorBoundary from "./components/ErrorBoundary/index.jsx";
import { Provider } from "react-redux";
import rootReducer from "./reducer/index.js";

// Redux store setup
const store = configureStore({
  reducer: rootReducer,
});

const Main = () => {
  const { clientId, isLoading, error } = useSsoId();

  if (isLoading) {
    return (
      <div aria-live="polite" aria-busy="true">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div role="alert">{error}</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  );
};

// Render Application
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  </Provider>
);
