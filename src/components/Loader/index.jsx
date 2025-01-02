import React from "react";
import styles from "./Loader.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.loaderContianer}>
      <div className={styles.loader}></div>
    </div>
  );
}
