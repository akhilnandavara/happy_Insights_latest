import React, { useRef, useState, useMemo, useCallback } from "react";
import styles from "./Layout.module.css";
import { Heading, Img, Text } from "../ui";
import { CiLogout, CiSettings } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { PiCrownSimpleFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import useDebounce from "../../hooks/useDebounce";

const placeholderImg = "https://api.dicebear.com/5.x/initials/svg?seed=Hello";

const MemoizedImg = React.memo(Img);

const MemoizedMenuItem = React.memo(({ item, onClick }) => (
  <div className={styles.profileItem} onClick={onClick}>
    {item.icon}
    <span className={styles.title}>{item.title}</span>
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
    user !== null ? user : JSON.parse(sessionStorage.getItem("user")),
    300
  );

  const getProfileImage = (user) => {
    if (user?.profile_photo_url) return user.profile_photo_url;
    if (user?.name)
      return `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`;
    return placeholderImg;
  };

  const profileImg = useMemo(
    () => getProfileImage(debouncedUser),
    [debouncedUser]
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
  const lastPart = location[location.length - 1]; // Get the last part of the path
  const pageName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.topBarContents}>
        <Heading as={"h2"} className={styles.topBarLeft}>
          {pageName}
        </Heading>
        <div className={styles.topBarRight}>
          <div className={styles.btnContainer}>
            <button
              className={styles.upgradeBtnContainer}
              onClick={() => navigate("upgrade")}
            >
              <PiCrownSimpleFill className={styles.icon} />
              <Text as={"p"} className={styles.upgradeBtn}>
                Upgrade Plans
              </Text>
            </button>
           
          </div>

          <div
            className={styles.profileContainer}
            role="button"
            aria-expanded={showMenu}
            aria-haspopup="true"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <MemoizedImg
              src={profileImg}
              alt="profile"
              className={styles.profileImg}
            />

            <div className={styles.profileContent}>
              <span className={styles.profileName}>{debouncedUser?.name}</span>
              <span className={styles.profileEmail}>
                {debouncedUser?.email}
              </span>
            </div>
            <IoIosArrowDown
              className={` ${styles.icon} ${styles.profileArrowDown} ${
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
      </div>
    </div>
  );
}
