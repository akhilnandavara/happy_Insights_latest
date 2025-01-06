import React, { useState } from "react";
import styles from "./upgradePage.module.css";
import { Text } from "../../components/ui";

const PricingHeader = () => {
  const [planType, setPlanType] = useState("Yearly");
  const planTypeOptions = ["Yearly", "Monthly"];

  return (
    <div className={styles.pricingHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>
          Streamline your insights.{" "}
          <span className={styles.highlightText}>Start 7-day free trial.</span>
        </h1>
        <p className={styles.subTitle}>
          Choose the perfect plan for your business needs
        </p>
        <div className={styles.toggleContainer}>
          <div className={styles.planToggle}>
            {planTypeOptions.map((plan, index) => (
              <div
                onClick={() => setPlanType(plan)}
                key={index}
                className={`${styles.plansToggleBtn} ${
                  planType === plan ? styles.active : ""
                }`}
              >
                {plan}
              </div>
            ))}
            <div className={styles.toggleBtnTag}>
              <Text as={"p"} className={styles.toggleBtnTagText}>
                Save 20%
              </Text>
              <div className={styles.arrowDown}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingHeader;
