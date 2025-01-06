import React, { lazy } from "react";
import DashBoardPage from "../features/Dashboard/DashBoardPage";
import MainLayout from "../pages/MainLayout";
import YouTubePage from "../features/YouTube";
import UpgradePage from "../pages/UpgradePlans";

const MainLayoutRoutes = [
  {
    path: "/",
    element: <MainLayout />, // Parent dashboard layout
    children: [
      { path: "dashboard", element: <DashBoardPage /> },
      { path: "youtube", element: <YouTubePage /> },
      { path: "upgrade", element: <UpgradePage /> },
    ],
  },
];

export default MainLayoutRoutes;
