import React from "react";
import styles from "../features/Upgrade/upgradePage.module.css";
// import { pricingMonthData } from "../data/upgradePage";
import PricingHeader from "../features/Upgrade/PricingHeader";
import PricingCard from "../features/Upgrade/PricingCard";

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
const UpgradePage = () => {
  return (
    <div className={styles.container}>
      <PricingHeader />
      <div className={styles.pricingGrid}>
        {pricingMonthData.map((plan) => (
          <PricingCard
            key={plan.title} // Use unique key
            title={plan.title}
            price={plan.price}
            features={plan.features}
            className={plan.class} // Ensure `class` key matches in data
          />
        ))}
      </div>
    </div>
  );
};

export default UpgradePage;
