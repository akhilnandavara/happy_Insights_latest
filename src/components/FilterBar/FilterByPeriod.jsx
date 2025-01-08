import React, { useState, useRef } from "react";
import styles from "./FilterBar.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Icon from "../Icon";
import { Text } from "../ui";
import { IoIosArrowDown } from "react-icons/io";

const FilterByPeriod = ({ onSelect }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dropdownRef = useRef(null);

  const options = ["Today", "This Week", "This Month", "Custom"];

  useOnClickOutside(dropdownRef, () => setIsDropDownOpen(false)); // Use the custom hook

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropDownOpen(false);
    onSelect?.(option); // Optional chaining to handle undefined onSelect
  };

  return (
    <div className={styles.filterByPeriodContainer} ref={dropdownRef}>
      <div className={styles.filterByPeriod}>
        <button
          className={styles.filterBtnContainer}
          onClick={() => setIsDropDownOpen((prev) => !prev)}
        >
          <Icon sprite="youtube" name="calender" className={styles.icon} />
          <Text as={"p"} className={styles.filterBtnText}>
            {" "}
            {selectedOption}
          </Text>
         <IoIosArrowDown
            className={`${styles.icon} ${styles.arrowDown} ${
              isDropDownOpen && styles.arrowRotate
            }`}
          />
        </button>
        {isDropDownOpen && (
          <div className={`${styles.dropdownMenu} ${styles.open}`}>
            {options.map((option) => (
              <button
                key={option}
                className={styles.dropdownItem}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedOption === "Custom" && (
        <div className={styles.customDateContainer}>
          {["Start Date", "End Date"].map((label, index) => (
            <div className={styles.datePicker} key={label}>
              <label className={styles.datePickerLabel}>{label}</label>
              <DatePicker
                selected={index === 0 ? startDate : endDate}
                onChange={(date) =>
                  index === 0 ? setStartDate(date) : setEndDate(date)
                }
                placeholderText="dd/mm/yyyy"
              />
              <Icon sprite="youtube" name={"calender"} className={styles.icon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByPeriod;
