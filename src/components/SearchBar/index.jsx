import React from "react";
import styles from "./SearchBar.module.css"; // Import the styles
import Icon from "../Icon";

const SearchBar = ({
  placeholder = "Enter...",
  value,
  onChange,
  className,
  customIconClasss,
}) => {
  return (
    <div className={`${styles.searchBarContainer} ${className}`}>
      <Icon name={"search-icon"} className={`${styles.searchIcon} ${customIconClasss}`} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
