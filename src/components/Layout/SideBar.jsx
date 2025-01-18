import React, { useState, useRef } from "react";
import styles from "./Layout.module.css";
import { Heading, Img } from "../ui";
import { profilelinks, sidebarlinks } from "../../data/sidebarlinks";
import SideBarLink from "./SideBarLink";
import hiSmalllogo from "../../assets/images/hi-small-logo.png";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ToggleSideBarBtn from "../ToggleSideBarBtn";
import { setShowIntroModal } from "../../store/slices/profileSlice";
import { useDispatch } from "react-redux";

export default function SideBar({ showIntroModal }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const dispatch = useDispatch();
  const sideBarRef = useRef();
  // const { width } = useWindowSize();
  //   const [isMobile, setIsMobile] = useState(width < 600);

  useOnClickOutside(sideBarRef, (prev) => isMobile && setIsSideBarOpen(!prev));

  return (
    <div
      ref={sideBarRef}
      className={`${styles.sidebar}  ${
        isSideBarOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      {/* Sidebar Links */}
      <div
        className={`${styles.sidebarLinksContainer} ${
          isSideBarOpen ? "" : styles.closed
        }`}
      >
        <div className={styles.logoAndLinksContainer}>
          {/* Logo */}
          <div
            className={`${styles.logoContainer} ${
              isSideBarOpen ? "" : styles.logoContainerClosed
            }`}
            onClick={() => dispatch(setShowIntroModal(true))}
          >
            <Img
              onClick={showIntroModal}
              src={hiSmalllogo}
              alt="logoImg"
              className={`${styles.logoImg} ${
                isSideBarOpen ? "" : styles.logoImgClosed
              }`}
            />
            <Heading
              className={`${styles.sidebarlogoText}  ${
                isSideBarOpen ? "" : styles.hidden
              }`}
            >
              Happy Insights
            </Heading>
          </div>

          {sidebarlinks.map((link) => (
            <SideBarLink
              key={link.id}
              link={link}
              iconName={link.icon}
              isSideBarOpen={isSideBarOpen}
            />
          ))}
        </div>

        <div className={styles.profileLinksContainer}>
          <div className={styles.lineBar}></div>
          {profilelinks.map((link) => (
            <SideBarLink
              key={link.id}
              link={link}
              iconName={link.icon}
              isSideBarOpen={isSideBarOpen}
            />
          ))}
        </div>
      </div>

      {/* Toggle Button - Only visible on small screens */}
      <ToggleSideBarBtn
        setSidebarOpen={setIsSideBarOpen}
        isSidebarOpen={isSideBarOpen}
      />
    </div>
  );
}
