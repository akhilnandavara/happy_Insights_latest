import React from "react";
import styles from "./Styles/ActionMenu.module.css"; // Assume you have some basic styles for ActionMenu

const ActionMenu=({ items, onClick })=> {
  return (
    <ul className={styles.menu}>
      {items.map((item) => (
        <li key={item.id} className={styles.menuItem} onClick={() => onClick(item)}>
          <item.icon className={styles.icon} /> {/* Icon for each menu item */}
          {item.title}
        </li>
      ))}
    </ul>
  );
}


export { ActionMenu };