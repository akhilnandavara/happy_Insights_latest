import React from "react";
import styles from "./Styles/Text.module.css"; // Importing the CSS module

const sizes = {
  text3xl: styles.text3xl,
  text6xl: styles.text6xl,
};

const Text = ({ children, className = "", as, size = "text3xl", ...restProps }) => {
  const Component = as || "p";
  return (
    <Component className={`${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
