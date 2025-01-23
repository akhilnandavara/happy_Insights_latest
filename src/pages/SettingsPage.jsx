import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/BreadCrumb";

const breadcrumbMap = {
  settings: "Settings",
  "pricing-model": "Pricing Model",
  "channel-configuration": "Channel Configuration",
  payment: "Payment",
};

const SettingsPage = () => {
  return (
    <>
      <Breadcrumb breadcrumbMap={breadcrumbMap} />
      <Outlet />
    </>
  );
};

export default SettingsPage;
