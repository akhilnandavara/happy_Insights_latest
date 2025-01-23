import React, { lazy } from "react";
import DashBoardPage from "../pages/DashBoardPage";
import MainLayout from "../pages/MainLayout";
import YouTubePage from "../pages/YouTubePage";
import PricingModel from "../features/settings/Payment/PricingModel";
import ChannelConfig from "../features/settings/ChannelConfig";
import SettingsPage from "../pages/SettingsPage";
import PaymentPage from "../features/settings/Payment/PaymentPage";

const MainLayoutRoutes = [
  {
    path: "/",
    element: <MainLayout />, // Parent dashboard layout
    children: [
      { path: "dashboard", element: <DashBoardPage /> },
      { path: "youtube", element: <YouTubePage /> },
      {
        path: "settings",
        element: <SettingsPage />, // Parent component for settings
        children: [
          {
            path: "pricing-model",
            element: <PricingModel />,
          }, // Child route
          { path: "channel-configuration", element: <ChannelConfig /> }, // Child route
          { path: "pricing-model/payment", element: <PaymentPage /> },
        ],
      },
    ],
  },
];

export default MainLayoutRoutes;
