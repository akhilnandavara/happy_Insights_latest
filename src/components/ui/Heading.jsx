import React from "react";
import styles from "./Styles/Heading.module.css"; // Importing the CSS module

const sizes = {
  text4xl: styles.text4xl,
  headingxl: styles.headingxl,
};

const Heading = ({ children, className = "", size = "text4xl", as, ...restProps }) => {
  const Component = as || "h6";
  return (
    <Component className={`${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
