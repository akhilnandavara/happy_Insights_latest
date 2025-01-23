import React, { useState } from "react";
import styles from "./Payment.module.css";
import PricingCard from "./components/PricingCard";
import PricingHeader from "./components/PricingHeader";
import { Text } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

const pricingMonthData = [
  {
    title: "Basic",
    price: "$3",
    features: [
      "Task Management",
      "Project Planning",
      "Team Collaboration",
      "Notifications and Reminders",
    ],
    classes: styles.basicBorderTop,
  },
  {
    title: "Normal",
    price: "$5",
    features: [
      "Kanban Boards",
      "Gantt Charts",
      "Resource Allocation",
      "Calendar Integration",
      "Progress Tracking",
    ],
    class: styles.normalBorderTop,
  },
  {
    title: "Pro",
    price: "$6",
    features: [
      "Customizable Workflows",
      "Reporting and Analytics",
      "Document Management",
      "Agile Methodology Support",
      "Issue Tracking",
    ],
    class: styles.proBorderTop,
  },
  {
    title: "Advance",
    price: "$8",
    features: [
      "SSO",
      "All integrations",
      "Client Collaboration with 2FA",
      "Advanced Project Planning",
      "Mobile App Integration",
    ],
    class: styles.advanceBorderTop,
  },
];

const PricingModel = () => {
  const [planType, setPlanType] = useState("Yearly");
  const planTypeOptions = ["Yearly", "Monthly"];
  const navigate = useNavigate();
  const onBtnClick = () => {
    navigate("/settings/pricing-model/payment");
  };

  return (
    <div className={styles.container}>
      <PricingHeader />

      <div className={styles.dynamicPricingContainer}>
        {/* Toggle */}
        <div className={styles.toggleContainer}>
          {planTypeOptions.map((plan, index) => (
            <div
              onClick={() => setPlanType(plan)}
              key={index}
              className={`${styles.toggleBtn} ${
                planType === plan ? styles.active : ""
              }`}
            >
              {plan}
            </div>
          ))}
          <div className={styles.saveTag}>
            <Text as={"p"} className={styles.toggleBtnTagText}>
              Save 20%
            </Text>
            <div className={styles.arrowDown}></div>
          </div>
        </div>
        {/* Pricings Cards */}
        <div className={styles.pricingCardsContainer}>
          {pricingMonthData.map((plan) => (
            <PricingCard
              key={plan.title} // Use unique key
              title={plan.title}
              price={plan.price}
              features={plan.features}
              className={plan.class} // Ensure `class` key matches in data
              onBtnClick={onBtnClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingModel;
