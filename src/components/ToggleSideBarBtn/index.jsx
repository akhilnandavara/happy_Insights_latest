import React, { useCallback } from "react";
import styles from "./ToggleSideBarBtn.module.css";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import classNames from "classnames";

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
        {isSidebarOpen ? (
          <MdOutlineKeyboardArrowLeft className={styles.toggleIcon} />
        ) : (
          <MdOutlineKeyboardArrowRight className={styles.toggleIcon} />
        )}
      </button>
    </div>
  );
}
