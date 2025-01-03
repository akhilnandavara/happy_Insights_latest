import React from 'react';
import styles from './SearchBar.module.css'; // Import the styles
import { CiSearch } from 'react-icons/ci'; // Icon library (replace if needed)

const SearchBar = ({ placeholder = 'Enter...', value, onChange }) => {
  return (
    <div className={styles.searchBarContainer}>
      <CiSearch className={styles.searchIcon} />
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
