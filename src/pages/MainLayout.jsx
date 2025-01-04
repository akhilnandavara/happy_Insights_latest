import React from "react";
import TopBar from "../components/Layout/TopBar";
import SideBar from "../components/Layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className={"mainLayoutContainer"}>
      {/* Top bar and sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className={"contentContainer"}>
        <TopBar />
        <div className={"dynamicContent"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
