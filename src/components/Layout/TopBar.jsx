import React, { useRef, useState, useMemo, useCallback } from "react";
import styles from "./Layout.module.css";
import { Heading, Text } from "../ui";
import { CiLogout, CiSettings } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useDebounce from "../../hooks/useDebounce";
import Icon from "../Icon";
import ProfileAvatar from "../ProfileAvatar";

const MemoizedMenuItem = React.memo(({ item, onClick }) => (
  <div className={styles.profileItem} onClick={onClick}>
    <div className={styles.sidebarIcon}>{item.icon}</div>
    <div className={styles.title}>{item.title}</div>
  </div>
));

const ProfileMenu = React.memo(({ linemenu, onClick }) => (
  <div className={styles.topProfileContent}>
    {linemenu.map((item) => (
      <MemoizedMenuItem
        key={item.id}
        item={item}
        onClick={() => onClick(item)}
      />
    ))}
  </div>
));

export default function TopBar({ onLogout }) {
  const { user } = useSelector((state) => state.profile);
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const debouncedUser = useDebounce(
    user !== null ? user : JSON.parse(localStorage.getItem("user")),
    300
  );

  const linemenu = useMemo(
    () => [
      { title: "Profile", id: 1, path: "/money", icon: <CiSettings /> },
      { title: "Logout", id: 2, func: onLogout, icon: <CiLogout /> },
    ],
    [onLogout]
  );

  const handleMenuClick = useCallback(
    (item) => {
      if (item.path) navigate(item.path);
      if (item.func) item.func();
    },
    [navigate]
  );

  useOnClickOutside(ref, () => setShowMenu(false));
  const location = window.location.pathname.split("/");
  const lastPart = location[1]; // Get the last part of the path
  const pageName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

  return (
    <div className={styles.container}>
      <>
        <Heading as={"h2"} className={styles.topBarPageTitle}>
          {pageName}
        </Heading>
        <div className={styles.topBarRight}>
          <button
            className={styles.upgradeBtnContainer}
            onClick={() => navigate("/settings/pricing-model")}
          >
            <Icon name={"crown"} className={styles.sidebarIcon} />
            <Text as={"p"} className={styles.upgradeBtn}>
              Upgrade Plans
            </Text>
          </button>

          <div
            className={styles.profileContainer}
            role="button"
            aria-expanded={showMenu}
            aria-haspopup="true"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <ProfileAvatar
              name={debouncedUser?.name}
              profilePhotoUrl={debouncedUser?.profile_photo_url}
              size={40} // You can customize the size
            />
            <div className={styles.profileContent}>
              <span className={styles.profileName}>{debouncedUser?.name}</span>
              <span className={styles.profileEmail}>
                {debouncedUser?.email}
              </span>
            </div>
            <Icon
              name={"arrow-down"}
              className={` ${styles.sidebarIcon} ${styles.profileArrowDown} ${
                showMenu ? styles.rotate : ""
              }`}
            />

            {/* Menu  */}
            {showMenu && (
              <div ref={ref} className={styles.profileMenu}>
                <ProfileMenu linemenu={linemenu} onClick={handleMenuClick} />
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
