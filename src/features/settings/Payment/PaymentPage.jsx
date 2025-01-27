import React, { useState } from "react";
import styles from "./Styles/PaymentPage.module.css";
import { Heading, Img, Text } from "../../../components/ui";
import masterCardLogo from "../../../assets/paymentImages/MasterCard.png";
import dineLogo from "../../../assets/paymentImages/DinersClub.png";
import visaLogo from "../../../assets/paymentImages/visa.png";
import amexLogo from "../../../assets/paymentImages/AMEX.png";
import gpayLogo from "../../../assets/paymentImages/GooglePay.png";
import applePayLogo from "../../../assets/paymentImages/ApplePay.png";
import payPalLogo from "../../../assets/paymentImages/PayPal.png";
import shopPayLogo from "../../../assets/paymentImages/ShopPay.png";
import alipayLogo from "../../../assets/paymentImages/Alipay.png";
import PeriodToggle from "./components/PeriodToggle";

const methodIcons = {
  cardIcons: [
    { name: "diners", src: dineLogo },
    { name: "visa", src: visaLogo },
    { name: "amex", src: amexLogo },
    { name: "master-card", src: masterCardLogo },
  ],
  upiIcons: [
    { name: "paypal", src: payPalLogo },
    { name: "applepay", src: applePayLogo },
    { name: "shopPay", src: shopPayLogo },
    { name: "gpay", src: gpayLogo },
    { name: "alipay", src: alipayLogo },
  ],
};
const paymentPageHeaderContent = {
  title: "Take Your Membership to the Next Level",
  desc: "Unlock full access to all features and maximize your savings with an additional  20% discount when you choose our yearly subscription. Take advantage of this exclusive offer and streamline your channel management like never before!",
};
const membershipPlans = [
  { type: "Basic", price: 36, period: "Year" },
  { type: "Normal", price: 60, period: "Year" },
  { type: "Pro", price: 72, period: "Year" },
  { type: "Advance", price: 96, period: "Year" },
];

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "United States",
    state: "",
    city: "",
    zip: "",
    membershipType: "Pro",
    termsAccepted: false,
    useCoins: false,
  });

  const [planPeriod, setPlanPeriod] = useState("Yearly");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    alert(
      `Payment submitted for ${formData.membershipType} plan using ${formData.paymentMethod}`
    );
    console.log("Form Data:", formData);
  };
  const { cardIcons, upiIcons } = methodIcons;
  const { title, desc } = paymentPageHeaderContent;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as={"h1"} className={styles.title}>
            {title}
          </Heading>
          <Text as={"p"} className={styles.description}>
            {desc}
          </Text>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            {/* Left Section */}
            <div className={styles.leftSection}>
              <div className={styles.contentWrapper}>
                <Heading as={"h3"} className={styles.sectionTitle}>
                  Payment Method
                </Heading>
                <div className={styles.methodOptions}>
                  {/* Card Option */}
                  <label
                    className={`${styles.method} ${
                      formData.paymentMethod === "card" ? styles.active : ""
                    }`}
                  >
                    <input
                      type="radio" // Changed from checkbox to radio
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className={styles.radio} // Update class if needed
                    />
                    <span className={styles.customRadio}></span>
                    <div className={styles.methodIconsContainer}>
                      {cardIcons.map((icon) => (
                        <div
                          className={`${styles.iconWrapper} ${
                            icon.name === "amex" && styles.amexIcon
                          }`}
                        >
                          <Img
                            key={icon.name}
                            src={icon.src}
                            alt={icon.name}
                            className={`${styles.methodsIcon} `}
                          />
                        </div>
                      ))}
                    </div>
                  </label>
                  {/* UPI Option */}
                  <label
                    className={`${styles.method} ${
                      formData.paymentMethod === "upi" ? styles.active : ""
                    }`}
                  >
                    <input
                      type="radio" // Changed from checkbox to radio
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleChange}
                      className={styles.radio} // Update class if needed
                    />
                    <span className={styles.customRadio}></span>
                    {upiIcons.map((icon) => (
                      <div
                        className={`${styles.iconWrapper} ${
                          icon.name === "shopPay" && styles.shopPayIcon
                        }`}
                      >
                        <Img
                          key={icon.name}
                          src={icon.src}
                          alt={icon.name}
                          className={`${styles.methodsIcon} `}
                        />
                      </div>
                    ))}
                  </label>
                </div>
              </div>

              {formData.paymentMethod === "card" && (
                <div className={styles.contentWrapper}>
                  <h3 className={styles.sectionTitle}>Card Details</h3>
                  <div className={styles.inputWrapper}>
                    {/* Card Holder Name */}
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    {/* Card Number */}
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    {/* DD/YY And Cvv */}
                    <div className={styles.row}>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM / YY"
                        value={formData.expiry}
                        onChange={handleChange}
                        className={styles.inputSmall}
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={styles.inputSmall}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.contentWrapper}>
                <h3 className={styles.sectionTitle}>Address</h3>
                <div className={styles.inputWrapper}>
                  <div className={styles.row}>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      disabled
                      className={`${styles.input} ${styles.disabled}`}
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.row}>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <textarea
                    type="text"
                    name="address"
                    placeholder="Add Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <Text as={"p"} className={styles.captionText}>
                    Please enter valid address for secure payment.
                  </Text>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className={styles.rightSection}>
              <PeriodToggle
                planPeriod={planPeriod}
                setPlanPeriod={setPlanPeriod}
              />
              <div className={styles.plansInputsWrapper}>
                <div className={styles.contentWrapper}>
                  <h3 className={styles.sectionTitle}>Membership Type</h3>
                  {membershipPlans.map((plan) => (
                    <label
                      className={`${styles.planBtn} ${
                        formData.membershipType === plan.type && styles.active
                      }`}
                      key={plan.type}
                    >
                      <input
                        type="radio"
                        name="membershipType"
                        value={plan.type}
                        checked={formData.membershipType === plan.type}
                        onChange={handleChange}
                      />
                      <span className={styles.customRadio}></span>
                      <div className={styles.planContent}>
                        <Heading as={"h4"} className={styles.sectionTitle}>
                          {plan.type}
                        </Heading>
                        <Text as={"p"} className={styles.planPriceTag}>
                          ${plan.price} / {plan.period}
                        </Text>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Use Coins */}
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="useCoins"
                    checked={formData.useCoins}
                    onChange={handleChange}
                  />
                  <span
                    className={`${styles.customRadio} ${styles.termsCustomRadio}`}
                  ></span>
                  <Text as={"p"} className={styles.description}>
                    {" "}
                    Use Coins{" "}
                    <strong className={styles.highLightedText}>
                      (1 coin = $0.05),
                    </strong>{" "}
                    <span className={styles.darkerText}>
                      {" "}
                      Balance:{" "}
                      <strong className={styles.highLightedTextOrange}>
                        1000
                      </strong>{" "}
                      coins.
                    </span>
                  </Text>
                </label>
                {/* T&c */}
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  <span
                    className={`${styles.customRadio} ${styles.termsCustomRadio}`}
                  ></span>

                  <Text as={"p"} className={styles.description}>
                    By continuing, you agree to our{" "}
                    <a href="/terms">terms and conditions</a>.
                  </Text>
                </label>
              </div>
              <button type="submit" className={styles.submitButton}>
                Upgrade Plan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
