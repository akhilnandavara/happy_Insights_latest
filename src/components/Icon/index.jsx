import React from "react";
import styles from "./Icon.module.css";

const Icon = ({
  name,
  sprite = "global",
  className = "",
  fill = "#6B7280", // Default fill for themes
}) => {
  // const spriteUrl = `/icons/${sprite}.svg#${name}`; // Adjust for production
  const spriteUrl = `/public/icons/${sprite}.svg#${name}`; // Adjust for production

  return (
    <>
      <svg className={`${styles.icon} ${className}`} fill="currentColor">
        <use href={spriteUrl} />
      </svg>
    </>
  );
};

export default Icon;
