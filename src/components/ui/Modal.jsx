import React from "react";
import styles from "./Styles/Modal.module.css"; // Assume you have some basic modal styles here

const Modal=({ children, onClose })=> {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </div>
  );
}

export { Modal };