import React from "react";
import styles from "./upgradePage.module.css";
import { Heading, Text } from "../../components/ui";
import { IoCheckmarkSharp } from "react-icons/io5";

const PricingCard = ({ title, price, features, buttonText, className }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div>
        <Heading as={"p"} assName={styles.cardTitle}>
          {title}
        </Heading>
        <Text as={"p"} className={styles.cardSubDesc}>
          10X AI Generated reply and Dummy Content
        </Text>
      </div>
      <div className={styles.cardPrice}>
        <Text as={"p"} className={styles.priceTag}>
          {price}
        </Text>
        <Text as={"p"} className={styles.priceTagPeriod}>
          /Year
        </Text>
      </div>
      <ul className={styles.featuresList}>
        <Heading as={"h2"}>What You Get</Heading>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <IoCheckmarkSharp className={`${styles.icon} ${styles.featureTickIcon}`} />
            <Text> {feature}</Text>
          </li>
        ))}
      </ul>
      <button className={styles.cardButton}>Get Started</button>
    </div>
  );
};

export default PricingCard;
