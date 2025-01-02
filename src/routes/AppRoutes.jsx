import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

import LoadingSpinner from "../components/Loader";
import ErrorBoundary from "../components/ErrorBoundary";
import routesConfig from "./RoutesConfig";

const AppRoutes = () => {
  const element = useRoutes(routesConfig);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
