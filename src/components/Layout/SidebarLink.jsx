import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import matchRoute from "../../utils/matchRoute";
import Icon from "../Icon";

export default function SideBarLink({ link, iconName, isSideBarOpen }) {
  const location = useLocation();

  return (
    <NavLink
      to={link.path}
      className={`${
        matchRoute(link.path, location.pathname) ? styles.selectedLink : ""
      } ${styles.navlink}`}
    >
      <div className={`${styles.navcontent} `}>
      
        <Icon
          name={link.name.toLowerCase()}
          className={`${styles.sidebarIcon}`}
        />
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
