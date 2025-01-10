import React, { useCallback } from "react";
import styles from "./ToggleSideBarBtn.module.css";
import classNames from "classnames";
import Icon from "../Icon";

export default function ToggleSideBarBtn({ setSidebarOpen, isSidebarOpen }) {
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={classNames(styles.toggleButtonWrapper, {
        [styles.toggleButtonWrapperOpen]: isSidebarOpen,
        [styles.toggleButtonWrapperClosed]: !isSidebarOpen,
      })}
    >
      <button
        aria-label="Toggle sidebar"
        className={classNames(styles.toggleButton, {
          [styles.toggleButtonClosed]: isSidebarOpen,
          [styles.toggleButtonOpen]: !isSidebarOpen,
        })}
        onClick={toggleSidebar}
      >
        <Icon name="arrow-down" className={`${styles.toggleIcon} ${!isSidebarOpen && styles.toggleIconClosed}`} />
      </button>
    </div>
  );
}
