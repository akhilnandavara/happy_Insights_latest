import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import matchRoute from "../../utils/matchRoute";
import Icon from "../Icon";

export default function SideBarLink({ link, iconName, isSideBarOpen, onNotificationClick }) {
  const location = useLocation();

  // If it's the notifications link, prevent navigation and run the click handler
  const handleClick = (e) => {
    if (link.name.toLowerCase() === "notifications" && onNotificationClick) {
      e.preventDefault();
      onNotificationClick();
    }
  };

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}  // Add click handler to prevent navigation on notifications link
      className={`${
        matchRoute(link.path, location.pathname) ? styles.selectedLink : ""
      } ${styles.navlink}`}
    >
      <div className={`${styles.navcontent}`}>
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
