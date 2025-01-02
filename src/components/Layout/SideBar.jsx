import React, { useState, useRef } from "react";
import styles from "./Layout.module.css";
import { Img } from "../ui";
import { profilelinks, sidebarlinks } from "../../data/sidebarlinks";
import SideBarLink from "./SideBarLink";
import hiSmalllogo from "../../assets/images/hi-small-logo.png";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ToggleSideBarBtn from "../ToggleSideBarBtn";

export default function SideBar({ showIntroModal }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const sideBarRef = useRef();
  // const { width } = useWindowSize();
  //   const [isMobile, setIsMobile] = useState(width < 600);

  useOnClickOutside(sideBarRef, (prev) => isMobile && setIsSideBarOpen(!prev));

  return (
    <div
      ref={sideBarRef}
      className={`${styles.sidebar} ${
        isSideBarOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      {/* Logo */}
      <Img
        onClick={showIntroModal}
        src={hiSmalllogo}
        alt="logoImg"
        className={`${styles.logoImg} ${
          isSideBarOpen ? "" : styles.logoImgClosed
        }`}
      />

      {/* Sidebar Links */}
      <div
        className={`${styles.sidebarLinksContainer} ${
          isSideBarOpen ? "" : styles.closed
        }`}
      >
        {sidebarlinks.map((link) => (
          <SideBarLink
            key={link.id}
            link={link}
            iconName={link.icon}
            isSideBarOpen={isSideBarOpen}
          />
        ))}

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

      {/* Toggle Button - Only visible on small screens */}
      <ToggleSideBarBtn
        setSidebarOpen={setIsSideBarOpen}
        isSidebarOpen={isSideBarOpen}
      />

      <div
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        className={styles.toggleSideBar}
      ></div>
    </div>
  );
}
