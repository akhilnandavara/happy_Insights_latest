import { Navigate } from "react-router-dom";

import MainLayoutRoutes from "./MainLayoutRoutes";
import withSessionValidation from "../hoc/withSessionValidation";
import AuthPage from "../pages/AuthPage";

// Wrap the Auth component with the session validation HOC
const WrappedAuth = withSessionValidation(AuthPage);

const routesConfig = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "*", element: <Navigate to="/login" /> },
  { path: "/login", element: <WrappedAuth /> },
  { path: "/signup", element: <WrappedAuth /> },
  ...MainLayoutRoutes,
];

export default routesConfig;
