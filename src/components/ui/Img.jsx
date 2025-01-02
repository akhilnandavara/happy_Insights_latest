import React from "react";
import styles from "./Styles/Img.module.css"; // Importing the CSS module

const Img = ({ className = "", src = "defaultNoData.png", alt = "testImg", ...restProps }) => {
  return <img className={`${styles.img} ${className}`} src={src} alt={alt} {...restProps} loading="lazy" />;
};

export { Img };
