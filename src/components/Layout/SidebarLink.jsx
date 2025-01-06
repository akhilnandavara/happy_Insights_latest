import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "react-icons/ci";
import styles from "./Layout.module.css";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import matchRoute from "../../utils/matchRoute";

export default function SideBarLink({ link, iconName, isSideBarOpen }) {
  const Icon = Icons[iconName];
  const location = useLocation(); // Use the hook to get the current location

  return (
    <NavLink
      to={link.path}
      className={`${
        matchRoute(link.path, location.pathname) ? styles.selectedLink : ""
      } ${styles.navlink}`}
    >
      <div
        className={`${
          matchRoute(link.path, location.pathname) ? styles[link.color] : ""
        } ${styles.navcontent} `}
      >
        {link.name.toLowerCase() === "dashboard" ? (
          <MdOutlineDashboardCustomize className={styles.sidebarIcon} />
        ) : (
          <Icon className={styles.sidebarIcon} />
        )}
        <span
          className={`${styles.navLinkName} ${
            isSideBarOpen ? "" : styles.hidden
          }`}
        >
          {link.name}
        </span>
      </div>
    </NavLink>
  );
}
