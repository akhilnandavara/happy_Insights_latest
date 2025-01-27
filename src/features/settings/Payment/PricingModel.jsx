import React, { useState } from "react";
import styles from "./Payment.module.css";
import PricingCard from "./components/PricingCard";
import PricingHeader from "./components/PricingHeader";
import { useNavigate } from "react-router-dom";
import PeriodToggle from "./components/PeriodToggle";

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
  const [planPeriod, setPlanPeriod] = useState("Yearly");

  const navigate = useNavigate();
  const onBtnClick = () => {
    navigate("/settings/pricing-model/payment");
  };

  return (
    <div className={styles.container}>
      <PricingHeader />

      <div className={styles.dynamicPricingContainer}>
        {/* Toggle */}
        <PeriodToggle planPeriod={planPeriod} setPlanPeriod={setPlanPeriod} pricingPage={true} />
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
