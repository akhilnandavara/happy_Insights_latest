import React, { lazy } from "react";
import DashBoardPage from "../features/Dashboard/DashBoardPage";
import MainLayout from "../pages/MainLayout";

const MainLayoutRoutes = [
  {
    path: "/",
    element: <MainLayout />, // Parent dashboard layout
    children: [
      { path: "dashboard", element: <DashBoardPage /> },
    ],
  },
];

export default MainLayoutRoutes;
