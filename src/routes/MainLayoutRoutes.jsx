import React, { lazy } from "react";
import DashBoardPage from "../pages/DashBoardPage";
import MainLayout from "../pages/MainLayout";
import UpgradePage from "../pages/UpgradePlans";
import YouTubePage from "../pages/YouTubePage";

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
