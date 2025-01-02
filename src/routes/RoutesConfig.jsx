import { Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import MainLayoutRoutes from "./MainLayoutRoutes";
import withSessionValidation from "../hoc/withSessionValidation";

// Wrap the Auth component with the session validation HOC
const WrappedAuth = withSessionValidation(Auth);

const routesConfig = [
  { path: "/", element: <Navigate to="/login" /> },
  { path: "*", element: <Navigate to="/login" /> },
  { path: "/login", element: <WrappedAuth /> },
  { path: "/signup", element: <WrappedAuth /> },
  ...MainLayoutRoutes,
];

export default routesConfig;
