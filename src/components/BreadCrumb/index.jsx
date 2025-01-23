import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Text } from "../ui";

const Breadcrumb = ({ breadcrumbMap }) => {
  const location = useLocation();

  // Split the current URL into parts
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items dynamically
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path =
      pathSegments.slice(0, index + 1).join("/") === "settings"
        ? "/" + "settings/channel-configuration"
        : "/" + pathSegments.slice(0, index + 1).join("/");

    const name =
      breadcrumbMap[segment] || segment.replace("-", " ").toUpperCase();

    // If it's the last item, make it active
    if (index === pathSegments.length - 1) {
      return (
        <li
          className={`${styles.breadcrumbItem}`}
          aria-current="page"
          key={path}
        >
          <Text className={`${styles.title} ${styles.breadCrumbText}`}>
            {name}
          </Text>
        </li>
      );
    }

    return (
      <li className={styles.breadcrumbItem} key={path}>
        <Link to={path} className={` ${styles.title} ${styles.breadcrumbLink}`}>
          {name}
        </Link>
        {/* Render arrow unless it's the last item */}
        {index < pathSegments.length - 1 && (
          <MdOutlineKeyboardArrowRight className={styles.icon} />
        )}
      </li>
    );
  });

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbNav}>
      <ol className={styles.breadcrumb}>{breadcrumbItems}</ol>
    </nav>
  );
};

export default Breadcrumb;
