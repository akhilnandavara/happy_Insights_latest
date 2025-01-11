import React, { useCallback } from "react";
import { RiArrowRightWideFill } from "react-icons/ri";
import ReactDatePicker from "react-datepicker";
import styles from "../styles/videoListSidebar.module.css";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { filterOptions } from "../utils";
import dayjs from "dayjs";
import { Text } from "../../../components/ui";

const FilterMenu = React.memo(
  React.forwardRef(
    (
      {
        showDatePicker,
        setShowDatePicker,
        handleDateChange,
        datePickerDate,
        toggleFavorites,
        toggleTop10,
        setIsFilterVisible,
        isFilterVisible,
        filterBtnRef,
      },
      ref
    ) => {
      // Memoized handleFilterClick function to prevent re-creating it on each render
      const handleFilterClick = useCallback(
        (filter) => {
          const { id, name } = filter;
          switch (id) {
            case 1: // Today
              handleDateChange(dayjs().format("YYYY-MM-DD"));
              break;
            case 2: // Favorites
              toggleFavorites();
              break;
            case 3: // Top 10
              toggleTop10();
              break;
            default:
              break;
          }
        },
        [handleDateChange, toggleFavorites, toggleTop10]
      );

      // Memoize the onClick outside logic to avoid it being re-created
      const handleOutsideClick = useCallback(
        (event) => {
          if (
            isFilterVisible &&
            ref.current &&
            !ref.current.contains(event.target) &&
            filterBtnRef.current &&
            !filterBtnRef.current.contains(event.target)
          ) {
            setShowDatePicker(false);
            setIsFilterVisible(false);
          }
        },
        [
          isFilterVisible,
          filterBtnRef,
          ref,
          setShowDatePicker,
          setIsFilterVisible,
        ]
      );

      useOnClickOutside(ref, handleOutsideClick);

      return (
        <div className={styles.filterMethod}>
          <ul className={styles.filterOptionsList} ref={ref}>
            {filterOptions.map(({ id, name, icon: Icon }) => (
              <li
                key={id}
                className={styles.filterItem}
                onClick={() => handleFilterClick({ id, name })}
              >
                <div className={styles.filterOptionLeftContents}>
                  <Icon className={styles.icon} />
                  <Text as="p" className={styles.filterOptionTitle}>
                    {name}
                  </Text>
                </div>
                {name === "Today" && (
                  <RiArrowRightWideFill
                    className={`${styles.icon}${styles.datePickerArrow}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDatePicker((prev) => !prev);
                    }}
                  />
                )}
              </li>
            ))}
            {showDatePicker && (
              <ReactDatePicker
                selected={datePickerDate}
                onChange={handleDateChange}
                inline
                className={styles.datePicker}
                maxDate={new Date()}
              />
            )}
          </ul>
        </div>
      );
    }
  )
);

export default FilterMenu;
