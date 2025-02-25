import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import FilterByPeriod from "./FilterByPeriod";
import Icon from "../Icon";
import { Text } from "../../components/ui";
import useWindowSize from "../../hooks/useWindowSize";

const FilterBar = ({ showStats, methods, onSelect }) => {
  const [activeMethod, setActiveMethod] = useState(Object.keys(methods)[0]); // Default to the first method
  const { width: windowWidth } = useWindowSize(); // Get window width

  const [visibleMethods, setVisibleMethods] = useState([]); // Methods to display
  const [overflowMethods, setOverflowMethods] = useState([]); // Overflow methods for the dropdown
  const containerRef = useRef(null);

  // Adjust visible and overflow methods based on container width
  useEffect(() => {
    const calculateMethods = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth || windowWidth; // Use container width or fallback to window width
      const visibleWidth = containerWidth * 0.4; // Allocate 40% of the container width
      let totalWidth = 0;
      const visible = [];
      const overflow = [];

      Object.entries(methods).forEach(([method, count]) => {
        const methodWidth = 100; // Approximate width of each method button
        if (totalWidth + methodWidth <= visibleWidth) {
          visible.push([method, count]);
          totalWidth += methodWidth;
        } else {
          overflow.push([method, count]);
        }
      });

      setVisibleMethods(visible);
      setOverflowMethods(overflow);
    };

    calculateMethods();
  }, [methods, windowWidth]);

  const handleMethodClick = (method) => {
    setActiveMethod(method);
    onSelect?.(method); // Trigger the callback if provided
  };

  return (
    <div className={styles.filterBarContainer} ref={containerRef}>
      <div className={styles.filterLeftContainer}>
        {visibleMethods.map(([method, count]) => (
          <button
            key={method}
            className={`${styles.filterItem} ${
              activeMethod === method ? styles.active : ""
            }`}
            onClick={() => handleMethodClick(method)}
          >
            {method} {count !== null && `(${count})`}
          </button>
        ))}
        {overflowMethods.length > 0 && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownToggleBtn}>
              <IoIosArrowDown
                className={`${styles.icon} ${styles.dropdownToggleBtnIcon}`}
              />
            </button>
            <div className={styles.dropdownMenu}>
              {overflowMethods.map(([method, count]) => (
                <button
                  key={method}
                  className={`${styles.dropdownItem} ${
                    activeMethod === method ? styles.active : ""
                  }`}
                  onClick={() => handleMethodClick(method)}
                >
                  {method} {count !== null && `(${count})`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.filterRightContainer}>
        <FilterByPeriod onSelect={onSelect} />
        {!showStats && (
          <button className={styles.filterBtnContainer}>
            <Icon sprite="youtube" name="filter" className={styles.icon} />
            <Text as="p" className={styles.filterBtnText}>
              Filter
            </Text>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
