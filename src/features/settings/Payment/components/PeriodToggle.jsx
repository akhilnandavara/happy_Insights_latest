import React from "react";
import styles from "../Styles/PeriodToggle.module.css";
import { Text } from "../../../../components/ui";

export default function PeriodToggle({
  planPeriod,
  setPlanPeriod,
  pricingPage = false,
}) {
  const planTypeOptions = ["Yearly", "Monthly"];

  return (
    <div className={styles.toggleContainer}>
      {planTypeOptions.map((plan, index) => (
        <div
          onClick={() => setPlanPeriod(plan)}
          key={index}
          className={`${styles.toggleBtn} ${
            planPeriod === plan ? styles.active : ""
          }`}
        >
          {plan}
          {!pricingPage && plan.toLowerCase() === "yearly" && (
            <span style={{ fontWeight: 400 }}> (Save 20%)</span>
          )}
        </div>
      ))}
      {pricingPage && (
        <div className={styles.saveTag}>
          <Text as={"p"} className={styles.toggleBtnTagText}>
            Save 20%
          </Text>
          <div className={styles.arrowDown}></div>
        </div>
      )}
    </div>
  );
}
