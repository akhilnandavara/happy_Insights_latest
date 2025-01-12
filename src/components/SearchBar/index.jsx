import React from "react";
import styles from "./SearchBar.module.css"; // Import the styles
import { CiSearch } from "react-icons/ci"; // Icon library (replace if needed)

const SearchBar = ({
  placeholder = "Enter...",
  value,
  onChange,
  className,
  customIconClasss,
}) => {
  return (
    <div className={`${styles.searchBarContainer} ${className}`}>
      <CiSearch className={`${styles.searchIcon} ${customIconClasss}`} />
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
