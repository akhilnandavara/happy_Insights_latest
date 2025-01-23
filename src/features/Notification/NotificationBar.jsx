import React, { useState } from "react";
import NotificationItem from "./NotificationItem";
import styles from "./NotificationBar.module.css";
import { notificationsData } from "../../data/Dashboard";
import { Heading, Text } from "../../components/ui";
import { IoCloseCircle } from "react-icons/io5";

const NotificationBar = ({ handleNotificationToggle }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all");

  const handleOnDropDownSelect = (action,id) => {
    if (action === "archive") {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id    
            ? { ...notification, archived: true }
            : notification
        )
      );
    } else if (action === "delete") {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    } else if (action === "all") {
      setNotifications(notificationsData);
    } else if (action === "markAsRead") {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } else if (action === "markAsUnread") {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: false }
            : notification
        )
      );
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "mentions") return notification.mentioned;
    if (filter === "archived") return notification.archived;
    return !notification.archived;
  });

  return (
    <div className={styles.notificationBar}>
      <div className={styles.notificationHeader}>
        {/* Inbox  -Top Section  */}
        <div className={styles.section_1}>
          <div className={styles.titleContainer}>
            <Heading as={"h2"} className={styles.headertitle}>
              Inbox
            </Heading>
            <Text className={styles.countTag}>2</Text>
          </div>

          <div className={styles.closeButtonContainer}>
            <Text as={"p"} className={styles.markAllRead}>
              Mark all as read
            </Text>
            <IoCloseCircle
              className={styles.closeIcon}
              onClick={handleNotificationToggle}
            />
          </div>
        </div>
        {/* Filter Tab */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`${styles.tabButton} ${
              filter === "mentions" ? styles.active : ""
            }`}
            onClick={() => setFilter("mentions")}
          >
            Mentions
          </button>
          <button
            className={`${styles.tabButton} ${
              filter === "archived" ? styles.active : ""
            }`}
            onClick={() => setFilter("archived")}
          >
            Archived
          </button>
        </div>
      </div>

      <div className={styles.notificationList}>
        {filteredNotifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDropDownSelect={handleOnDropDownSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationBar;
