import React from "react";
import TopBar from "../components/Layout/TopBar";
import SideBar from "../components/Layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className={"mainLayoutContainer"}>
      {/* Top bar and sidebar */}
      <TopBar />
      <SideBar />

      {/* Main content area */}
      <div className={"contentContainer"}>
        <Outlet />
      </div>
    </div>
  );
}
