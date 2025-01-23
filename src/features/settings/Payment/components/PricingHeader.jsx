import React from "react";
import styles from "../Payment.module.css";
import { Heading, Text } from "../../../../components/ui";

const PricingHeader = () => {
  return (
    <div className={styles.pricingHeader}>
      <Heading as={"h1"} className={styles.title}>
        Streamline your insights.{" "}
        <span className={styles.highlightText}>Start 7-day free trial.</span>
      </Heading>
      <Text as={"p"} className={styles.subTitle}>
        Choose the perfect plan for your business needs
      </Text>
    </div>
  );
};

export default PricingHeader;
