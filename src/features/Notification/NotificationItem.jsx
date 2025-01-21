import React from "react";
import styles from "./NotificationBar.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Heading, Text } from "../../components/ui";
import ProfileAvatar from "../../components/ProfileAvatar";
import { notificationsMenuDropDownData } from "../../data/Dashboard";

const NotificationItem = ({ notification, onDropDownSelect }) => {
  const { title, subText, description, time, image, mentioned } = notification;
  const [isDropDowmMenuActive, setIsDropDowmMenuActive] = React.useState(false);

  return (
    <div className={`${styles.notificationItem} `}>
      {/* User Profile */}
      <ProfileAvatar
        name={title}
        profilePhotoUrl={image}
        size={40} // You can customize the size
        className={styles.avatar}
      />
      <div className={styles.notificationDetails}>
        <div className={styles.notificationUserInfoContainer}>
          <Heading as={"h4"} className={styles.notificationUsername}>
            {title}
          </Heading>
          <Text
            as="p"
            className={` ${styles.notificationUsername} ${styles.subText}`}
          >
            {subText}
          </Text>
        </div>
        <div className={styles.notificationDesc}>{description}</div>
        <div
          className={`${styles.notificationUsername} ${styles.notificationTime}`}
        >
          {time}
        </div>
      </div>

      <div
        className={styles.menuIconContainer}
        onClick={() => setIsDropDowmMenuActive(!isDropDowmMenuActive)}
      >
        <BsThreeDotsVertical className={styles.crossIcon} />
        {isDropDowmMenuActive && (
          <ul className={styles.dropDownContainer}>
            {notificationsMenuDropDownData.map((item) => (
              <li
                key={item.id}
                className={`${styles.dropdownItem} `}
                onClick={() => onDropDownSelect(item.action, notification.id)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
