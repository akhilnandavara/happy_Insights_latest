import React, { useState, useRef } from "react";
import styles from "./FilterBar.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const FilterByPeriod = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dropdownRef = useRef(null);

  const options = ["Today", "This Week", "This Month", "Custom Date"];

  useOnClickOutside(dropdownRef, () => setIsOpen(false)); // Use the custom hook

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option); // Optional chaining to handle undefined onSelect
  };

  return (
    <div className={styles.filterByPeriodContainer} ref={dropdownRef}>
      <div className={styles.filterByPeriod}>
        <button
          className={styles.button}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FaCalendarAlt className={styles.icon} />
          {selectedOption} <IoIosArrowDown className={styles.arrow} />
        </button>
        {isOpen && (
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
      {selectedOption === "Custom Date" && (
        <div className={styles.customDateContainer}>
          {["Start Date", "End Date"].map((label, index) => (
            <div className={styles.datePicker} key={label}>
              <label className={styles.datePickerLabel}>{label}:</label>
              <DatePicker
                selected={index === 0 ? startDate : endDate}
                onChange={(date) =>
                  index === 0 ? setStartDate(date) : setEndDate(date)
                }
                placeholderText={`Select ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterByPeriod;
