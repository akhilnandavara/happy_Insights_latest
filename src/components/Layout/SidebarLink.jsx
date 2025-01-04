import React from "react";
import { NavLink } from "react-router-dom";
import * as Icons from "react-icons/ci";
import styles from "./Layout.module.css";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const matchRoute = (path, location) => {
  path = path.toLowerCase();
  if (path === "/") {
    return path === location;
  }
  return location.includes(path);
};

export default function SideBarLink({ link, iconName, isSideBarOpen }) {
  const Icon = Icons[iconName];
  const location = window.location.pathname;

  return (
    <NavLink
      to={link.path}
      className={`${
        matchRoute(link.name, location) ? styles.selectedLink : ""
      } ${styles.navlink}`}
    >
      <div
        className={`${
          matchRoute(link.name, location) ? styles[link.color] : ""
        } ${styles.navcontent} `}
      >
        {link.name.toLowerCase() === "dashboard" ? (
          <MdOutlineDashboardCustomize className={styles.icon} />
        ) : (
          <Icon className={styles.icon} />
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
