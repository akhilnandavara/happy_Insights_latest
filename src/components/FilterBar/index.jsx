import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import FilterByPeriod from "./FilterByPeriod";
import Icon from "../Icon";
import { Text } from "../../components/ui";


const FilterBar = ({ methods, onSelect }) => {
  const [activeMethod, setActiveMethod] = useState(methods[0]); // Default to the first method
  const [visibleMethods, setVisibleMethods] = useState([]); // Methods to display
  const [overflowMethods, setOverflowMethods] = useState([]); // Overflow methods for the dropdown
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateMethods = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const visibleWidth = containerWidth * 0.4; // Allocate 40% of the container width
      let totalWidth = 0;
      const visible = [];
      const overflow = [];

      methods.forEach((method) => {
        const methodWidth = 100; // Approximate width of each method button
        if (totalWidth + methodWidth <= visibleWidth) {
          visible.push(method);
          totalWidth += methodWidth;
        } else {
          overflow.push(method);
        }
      });

      setVisibleMethods(visible);
      setOverflowMethods(overflow);
    };

    calculateMethods();
    window.addEventListener("resize", calculateMethods);
    return () => window.removeEventListener("resize", calculateMethods);
  }, [methods, containerRef]);

  const handleMethodClick = (method) => {
    setActiveMethod(method);
    onSelect?.(method); // Trigger the callback if provided
  };

  return (
    <div className={styles.filterBarContainer} ref={containerRef}>
      <div className={styles.filterLeftContainer}>
        {visibleMethods.map((method) => (
          <button
            key={method}
            className={`${styles.filterItem} ${
              activeMethod === method ? styles.active : ""
            }`}
            onClick={() => handleMethodClick(method)}
          >
            {method}
          </button>
        ))}
        {overflowMethods.length > 0 && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownToggleBtn}>
              <IoIosArrowDown  className={`${styles.icon} ${styles.dropdownToggleBtnIcon}`} />
            </button>
            <div className={styles.dropdownMenu}>
              {overflowMethods.map((method) => (
                <button
                  key={method}
                  className={`${styles.dropdownItem} ${
                    activeMethod === method ? styles.active : ""
                  }`}
                  onClick={() => handleMethodClick(method)}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.filterRightContainer}>
        <FilterByPeriod onSelect={onSelect} />
        <button className={styles.filterBtnContainer}>
          <Icon sprite="youtube" name="filter" className={styles.icon} />
          <Text as={"p"} className={styles.filterBtnText}>
            Filter{" "}
          </Text>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
